import NextLink from "next/link"
import { Suspense } from "react"

import { homePage, legalPage } from "@/content/config"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { i18n } from "@/content/i18n"

export const Header = ({ lang }: { lang: string }) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          legalLabel: "Legal",
          logoAriaLabel: "Home",
        }
      : {
          legalLabel: "Impressum",
          logoAriaLabel: "Startseite",
        }
  return (
    <header className="bg-emerald-500 px-3 py-2">
      <nav className="flex justify-between space-x-2">
        <NextLink href={homePage(lang)} aria-label={dictionary.logoAriaLabel} className="text-lg tracking-tight">
          <span className="font-semibold">Fabi</span>Tours
          <span aria-hidden={true}>&nbsp;☀️</span>️
        </NextLink>
        <ul className="flex items-center space-x-3 divide-x divide-black">
          <li className="pe-3">
            <NextLink href={legalPage(lang)} className="hover:underline">
              {dictionary.legalLabel}
            </NextLink>
          </li>
          <li>
            {/* TODO: Add fallback */}
            <Suspense>
              <LanguageToggle className="hover:underline" />
            </Suspense>
          </li>
        </ul>
      </nav>
    </header>
  )
}
