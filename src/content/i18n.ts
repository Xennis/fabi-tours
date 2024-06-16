export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de"],
} as const

// export type Locale = (typeof i10n)["locales"][number];

export const toggledLangMetadata = (lang: string) => {
  // The srLabels are not in the dictionary because they are in the local language.
  return lang === "en"
    ? {
        label: "DE",
        srLabel: "Wechsel zur deutschen Sprache",
        lang: "de",
      }
    : {
        label: "EN",
        srLabel: "Switch to English language",
        lang: "en",
      }
}
