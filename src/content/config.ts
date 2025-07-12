// We are generating a static page. In case we switch to a dynamic page we can use the following directly in the
// robots.ts and sitemap.ts:
//
// const headersList = headers()
// const host = headersList.get("host")!
export const host = "tours.fabian-rosenthal.com"

export const homePage = (lang: string) => `/${lang}`
// slugs configured in CMS
export const legalPage = (lang: string) => `/${lang}/legal`
export const placesPage = (lang: string, anchor: string) => `/${lang}/places#${anchor}`

export const brandColor = "#10b981"

export const pageTitle = "FabiTours"
