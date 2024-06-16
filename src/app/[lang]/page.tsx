import { type Metadata } from "next"
import { Suspense } from "react"

import Mapbox from "@/components/map/mapbox"
import { createAlternativeUrls } from "@/lib/next"
import { homePage } from "@/content/config"
import { getCachedPlaces } from "@/lib/cms/fetchers"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  return {
    alternates: createAlternativeUrls(homePage, params.lang),
  }
}

export default async function LangHomePage({ params }: { params: { lang: string } }) {
  const places = await getCachedPlaces()
  return (
    <Suspense fallback={<div className="h-full w-full animate-pulse bg-gray-500"></div>}>
      <Mapbox lang={params.lang} places={places} className="flex-1" />
    </Suspense>
  )
}
