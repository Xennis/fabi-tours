import { type AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types"

import { i18n } from "@/content/i18n"

export const createAlternativeUrls = (pageFn: (lang: string) => string, lang: string): AlternateURLs => {
  const languages: AlternateURLs["languages"] = {}
  i18n.locales.forEach((lang) => {
    languages[lang] = pageFn(lang)
  })
  return {
    canonical: pageFn(lang),
    languages: languages,
  }
}
