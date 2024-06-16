import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts, propsNumber, propsSelectName } from "@react-notion-cms/fetch"

const langSelects = ["de", "en"] as const
export type PageLang = (typeof langSelects)[number]

export type Page = {
  description: string
  lang: PageLang
  lastEdited: Date
  notionId: string
  sitemapPriority: number
  slug: string
  title: string
}

const stringToLang = (lang: string | null): PageLang | null => {
  return langSelects.find((s) => s.toString() === lang) ?? null
}

export const processPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const description = propsPlainTexts(page.properties, "description")
  const lang = stringToLang(propsSelectName(page.properties, "lang"))
  const lastEdited = new Date(page.last_edited_time)
  const sitemapPriority = propsNumber(page.properties, "sitemap-priority")
  const slug = propsPlainTexts(page.properties, "slug")
  const title = propsPlainTexts(page.properties, "title")

  if (
    !description ||
    !lang ||
    Number.isNaN(lastEdited.getTime()) ||
    !sitemapPriority ||
    sitemapPriority < 0 ||
    sitemapPriority > 1 ||
    !slug ||
    !title
  ) {
    console.warn(`page with id=${page.id} and title="${title}" has invalid properties`)
    return null
  }

  return {
    description: description,
    lang: lang,
    lastEdited: lastEdited,
    notionId: page.id,
    sitemapPriority: sitemapPriority,
    slug: slug,
    title: title,
  }
}
