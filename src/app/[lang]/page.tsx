import { type Metadata } from "next"
import { Suspense } from "react"

import Mapbox from "@/components/map/mapbox"
import { createAlternativeUrls } from "@/lib/next"
import { homePage } from "@/content/config"
import { getCachedPlaces } from "@/lib/cms/fetchers"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata | null> {
  const params = await props.params
  return {
    alternates: createAlternativeUrls(homePage, params.lang),
  }
}

export default async function LangHomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const places = await getCachedPlaces()
  return (
    <Suspense fallback={<div className="h-full w-full animate-pulse bg-gray-500"></div>}>
      <Mapbox lang={params.lang} places={places} className="flex-1" />
    </Suspense>
  )
}
