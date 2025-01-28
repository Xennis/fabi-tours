import NextLink from "next/link"
import { type Metadata } from "next"

import { homePage } from "@/content/config"
import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n"
import { Headline } from "@/components/layout/headline"

const lang = i18n.defaultLocale

export const metadata: Metadata = {
  title: "Not Found",
  robots: {
    index: false,
  },
}

export default function NotFound() {
  return (
    <RootLayout lang={lang}>
      <main className="mx-auto w-full max-w-(--breakpoint-xl) px-3 py-10">
        <Headline>Page Not Found</Headline>
        <p>
          This page could not be found. Return to <NextLink href={homePage(lang)}>Home</NextLink>.
        </p>
      </main>
    </RootLayout>
  )
}
