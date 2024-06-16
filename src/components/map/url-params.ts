import { type ReadonlyURLSearchParams } from "next/navigation"
import { type Map } from "mapbox-gl"

import { type Place } from "@/lib/cms/places"

const paramZoom = "z"
const paramLng = "lng"
const paramLat = "lat"
const paramPlaceId = "p"

export const parseParams = (params: ReadonlyURLSearchParams, places: Array<Place>) => {
  const inZoom = params.get(paramZoom)
  const inLng = params.get(paramLng)
  const inLat = params.get(paramLat)
  const inPlaceId = params.get(paramPlaceId)

  if (inZoom === null && inLat === null && inLng === null && inPlaceId === null) {
    return null
  }
  if (inZoom && inLat && inLng) {
    const z = parseInt(inZoom)
    const lng = parseFloat(inLng)
    const lat = parseFloat(inLat)
    if (!Number.isNaN(z) && !Number.isNaN(lat) && !Number.isNaN(lng)) {
      return {
        z: z,
        lng: lng,
        lat: lat,
        p: null,
      }
    }
  }
  if (inPlaceId) {
    const place = places.find((p) => p.properties.id === inPlaceId)
    if (place !== undefined) {
      return {
        z: 14,
        lng: place.geometry.coordinates[0],
        lat: place.geometry.coordinates[1],
        p: place,
      }
    }
  }
  throw Error("invalid search params")
}

export const addPositionParams = (params: ReadonlyURLSearchParams, map: Map) => {
  // writable-copy
  const res = new URLSearchParams([...params.entries()])
  res.set(paramZoom, `${map.getZoom().toFixed(0)}`)
  res.set(paramLng, `${map.getCenter().lng.toFixed(7)}`)
  res.set(paramLat, `${map.getCenter().lat.toFixed(7)}`)
  res.delete(paramPlaceId)
  return res
}

export const addPlaceToParams = (params: ReadonlyURLSearchParams, placeId: string) => {
  const res = new URLSearchParams([...params.entries()])
  res.set(paramPlaceId, placeId)
  res.delete(paramZoom)
  res.delete(paramLng)
  res.delete(paramLat)
  return res
}
