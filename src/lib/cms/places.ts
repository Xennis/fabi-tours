import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Feature, Point, Position } from "geojson"
import {
  propsPlainTexts,
  propsMultiSelectNames,
  propsNumber,
  propsUniqueIdNumber,
  propsUrl,
} from "@xennis/react-notion-cms-fetch"

import { i18n } from "@/content/i18n"

export type Place = Feature<Point, PlaceProperties>

const placeTags = ["beach", "cafe", "naturereserve", "landmark", "park", "streetart", "viewpoint", "unknown"] as const
export type PlaceTag = (typeof placeTags)[number]

export type PlaceProperties = {
  id: string
  title: string
  mainTag: PlaceTag
  tags: Array<PlaceTag>
  address: string
  rating: number | null
  googleMaps: string
  komoot: string | null
}

export const tagColors: Record<PlaceTag, string> = {
  beach: "#fbb03b",
  cafe: "#ce34ed",
  naturereserve: "#2a8408",
  landmark: "#b6740e",
  park: "#159e92",
  streetart: "#000000",
  viewpoint: "#3bb2d0",
  unknown: "#000000",
}

export const tagLabel = (lang: string): Record<PlaceTag, string> => {
  if (lang === i18n.defaultLocale) {
    return {
      beach: "beach",
      cafe: "café",
      naturereserve: "nature reserve",
      landmark: "landmark",
      park: "park",
      streetart: "street art",
      viewpoint: "viewpoint",
      unknown: "unknown",
    }
  }
  return {
    beach: "Strand",
    cafe: "Café",
    naturereserve: "Naturgebiet",
    landmark: "Sehenswürdigkeit",
    park: "Park",
    streetart: "Street Art",
    viewpoint: "Aussichtspunkt",
    unknown: "Unbekannt",
  }
}

const stringToTag = (raw: string): PlaceTag => {
  return placeTags.find((t) => t.toString() === raw) ?? "unknown"
}

const stringToPosition = (raw: string | null): Position | null => {
  if (!raw) {
    return null
  }
  const split = raw.split(",")
  if (split.length !== 2) {
    console.warn(`invalid location: ${raw}`)
    return null
  }
  const lng = Number(split[0])
  const lat = Number(split[1])
  if (Number.isNaN(lng) || Number.isNaN(lat)) {
    console.warn(`invalid location: ${raw}`)
    return null
  }
  return [lng, lat]
}

export const processPlace = async (page: PageObjectResponse): Promise<Place | null> => {
  const id = propsUniqueIdNumber(page.properties, "ID")
  const title = propsPlainTexts(page.properties, "Name")
  const tags = propsMultiSelectNames(page.properties, "Tags")
  const position = stringToPosition(propsPlainTexts(page.properties, "Location"))
  const address = propsPlainTexts(page.properties, "Address")
  const googleMaps = propsUrl(page.properties, "Google Maps")
  if (!id || !title || !tags || !position || !address || !googleMaps) {
    console.warn(`page with id=${page.id} and title="${title}" has invalid properties`)
    return null
  }
  // Optional:
  const rating = propsNumber(page.properties, "Rating")
  const komoot = propsUrl(page.properties, "Komoot")

  const typedTags = tags.map((t) => stringToTag(t))

  return {
    type: "Feature",
    properties: {
      id: id.toString(),
      title: title,
      mainTag: typedTags[0],
      tags: typedTags,
      address: address,
      rating: rating,
      googleMaps: googleMaps,
      komoot: komoot,
    },
    geometry: {
      type: "Point",
      coordinates: position,
    },
  }
}
