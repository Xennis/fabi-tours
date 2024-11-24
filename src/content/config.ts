// We are generating a static page. In case we switch to a dynamic page we can use the following directly in the
// robots.ts and sitemap.ts:
//
// const headersList = headers()
// const host = headersList.get("host")!
export const host = "tours.fabian-rosenthal.com"

export const homePage = (lang: string) => `/${lang}`
export const legalPage = (lang: string) => `/${lang}/legal`

export const brandColor = "#10b981"

export const pageTitle = "FabiTours"
