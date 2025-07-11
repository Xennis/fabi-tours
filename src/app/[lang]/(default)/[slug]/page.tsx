import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { Render } from "@xennis/react-notion-cms-render"

import { Headline } from "@/components/layout/headline"
import { getCachedPage, getCachedPageContent, getCachedPages, getCachedPlaces } from "@/lib/cms/fetchers"
import { pageTitle } from "@/content/config"
import PlaceList from "@/components/place-list"

export const dynamicParams = false

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const result = (await getCachedPages())
    .filter((p) => p.lang.toString() === params.lang)
    .map((p) => ({ slug: p.slug }))
  console.debug("generateStaticParams", result)
  return result
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata | null> {
  const params = await props.params
  const page = await getCachedPage(params)
  if (page === null) {
    return null
  }

  return {
    description: page.description,
    alternates: {
      canonical: page.canonical,
      languages: page.languages,
    },
    openGraph: {
      description: page.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
        {
          url: "/og-image-square.png",
          width: 400,
          height: 400,
        },
      ],
      siteName: pageTitle,
      title: page.title,
      type: "website",
    },
    title: page.title,
  }
}

export default async function SlugPage(props: { params: Promise<{ lang: string; slug: string }> }) {
  const params = await props.params
  const page = await getCachedPage(params)
  if (page === null) {
    notFound()
  }
  const content = await getCachedPageContent(page.notionId)

  let endComponent: React.ReactNode | undefined = undefined
  if (params.slug === "places") {
    const places = await getCachedPlaces()
    endComponent = <PlaceList lang={params.lang} places={places} />
  }

  return (
    <div className={params.slug === "legal" ? "text-center" : ""}>
      <Headline>{page.title}</Headline>
      <Render
        blocks={content}
        options={{ formatDateFn: (date) => new Date(date).toString(), resolveLinkFn: (nId) => null }}
      />
      {endComponent !== undefined ? endComponent : <></>}
    </div>
  )
}
