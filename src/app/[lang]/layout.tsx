import { type Metadata } from "next"

import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n"
import { getMetadata } from "@/content/metadata"

export const dynamicParams = false

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata | null> {
  const params = await props.params
  return getMetadata(params.lang)
}

export default async function LangLayout(props: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params

  const { children } = props

  return <RootLayout lang={params.lang}>{children}</RootLayout>
}
