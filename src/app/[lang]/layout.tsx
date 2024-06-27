import { type Metadata } from "next"

import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n"
import { getMetadata } from "@/content/metadata"

export const dynamicParams = false

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata | null> {
  return getMetadata(params.lang)
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return <RootLayout lang={params.lang}>{children}</RootLayout>
}
