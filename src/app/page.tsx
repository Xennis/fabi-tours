import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { i18n } from "@/content/i18n"
import { homePage } from "@/content/config"
import { getMetadata } from "@/content/metadata"

export const metadata: Metadata = {
  ...getMetadata(i18n.defaultLocale),
  alternates: {
    canonical: homePage(i18n.defaultLocale),
  },
}

export default function HomePage() {
  redirect(`/${i18n.defaultLocale}`)
}
