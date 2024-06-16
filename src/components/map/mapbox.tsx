"use client"

import { useRef, useEffect } from "react"
import mapboxgl, { LngLatLike } from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"
import "./mapbox.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getPopupInfo, placePopUpDomContent } from "@/components/map/popup"
import { Place, tagColors } from "@/lib/cms/places"
import { matchGet } from "@/lib/mapbox-style"
import { addPlaceToParams, addPositionParams, parseParams } from "@/components/map/url-params"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

const circleColors = matchGet("mainTag", tagColors, tagColors.unknown)

export default function Mapbox({
  lang,
  places,
  className,
}: {
  lang: string
  places: Array<Place>
  className?: string
}) {
  // map
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  // routing
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (map.current) return // initialize map only once

    let initConfig = null
    try {
      initConfig = parseParams(searchParams, places)
    } catch (e) {
      console.warn(e)
      router.push(pathname)
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/xennis/clwae1a00007001r0cwz1hgqp",
      center: initConfig !== null ? [initConfig.lng, initConfig.lat] : [9.9872, 53.5488],
      zoom: initConfig !== null ? initConfig.z : 10,
      minZoom: 8,
      maxBounds: [
        [9.53475952, 53.32595198], // southwest
        [10.50979614, 53.77793497], // northeast
      ],
    })
      .addControl(new mapboxgl.NavigationControl())
      .addControl(new mapboxgl.GeolocateControl())
      .addControl(new mapboxgl.ScaleControl())

    map.current.on("load", (e) => {
      const map = e.target
      map.setLayoutProperty("country-label", "text-field", ["get", `name_${lang}`])
      map.on("moveend", (e) => {
        router.push(`${pathname}?${addPositionParams(searchParams, e.target).toString()}`)
      })

      // Marker layer
      const sourceId = "places"
      const layerId = "places"
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: places,
        },
      })
      map.addLayer({
        id: layerId,
        type: "circle",
        source: sourceId,
        paint: {
          // zoom is 5 (or less) -> circle radius will be 7px
          // zoom is 10 (or greater) -> circle radius will be 12px
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 7, 10, 12],
          "circle-color": circleColors,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })
      map.on("click", layerId, (e) => {
        const place = getPopupInfo(e.features, e.lngLat, lang)
        if (place === null) {
          return
        }
        const popup = new mapboxgl.Popup().setLngLat(place.lnglat).setDOMContent(place.domContent).addTo(map)
        popup.on("close", () => {
          router.push(`${pathname}?${addPositionParams(searchParams, map).toString()}`)
        })
        router.push(`${pathname}?${addPlaceToParams(searchParams, place.id).toString()}`)
      })
      map.on("mouseenter", layerId, () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseleave", layerId, () => {
        map.getCanvas().style.cursor = ""
      })

      // Show init place:
      const initPlace = initConfig !== null ? initConfig.p : null
      if (initPlace !== null) {
        const popup = new mapboxgl.Popup()
          .setLngLat(initPlace.geometry.coordinates as LngLatLike)
          .setDOMContent(placePopUpDomContent(lang, initPlace.properties))
          .addTo(map)
        popup.on("close", () => {
          router.push(`${pathname}?${addPositionParams(searchParams, map).toString()}`)
        })
      }
    })
  })

  return <div ref={mapContainer} className={className} />
}
