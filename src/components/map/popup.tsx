import type { LngLat, LngLatLike, MapboxGeoJSONFeature } from "mapbox-gl"
import type { GeoJsonProperties } from "geojson"

import { type PlaceProperties } from "@/lib/cms/places"
import { PlacePropertiesCard } from "@/components/place-properties-card"
import { createRoot } from "react-dom/client"

export const placePopUpDomContent = (lang: string, props: PlaceProperties) => {
  const container = document.createElement("div")
  const root = createRoot(container)
  root.render(
    <div className="p-2 text-base">
      <div className="pb-2 text-xl">{props.title}</div>
      <PlacePropertiesCard lang={lang} props={props} />
    </div>,
  )
  return container
}

const castToPlaceProperties = (props: GeoJsonProperties): PlaceProperties | null => {
  if (props === null) {
    return null
  }
  return {
    ...props,
    // null fields are stripped away resulting in undefined
    komoot: props.komoot || null,
    // Convert '["a","b"]' back to an actual array
    tags: JSON.parse(props.tags),
  } as PlaceProperties
}

export const getPopupInfo = (features: MapboxGeoJSONFeature[] | undefined, lngLat: LngLat, lang: string) => {
  const feature = features !== undefined ? features[0] : undefined
  if (feature === undefined || feature.geometry.type !== "Point") {
    return null
  }
  const props = castToPlaceProperties(feature.properties)
  if (props === null) {
    return null
  }

  // Copy coordinates array.
  const coordinates = feature.geometry.coordinates.slice()

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360
  }

  return {
    id: props.id,
    lnglat: [coordinates[0], coordinates[1]] as LngLatLike,
    domContent: placePopUpDomContent(lang, props),
  }
}
