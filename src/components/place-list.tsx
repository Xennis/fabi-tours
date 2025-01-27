import { Place, PlaceTag, tagColors, tagLabel } from "@/lib/cms/places"
import { PlacePropertiesCard } from "@/components/place-properties-card"

export default async function PlaceList({ lang, places }: { lang: string; places: Array<Place> }) {
  const placesByTag = new Map<PlaceTag, Array<Place>>()
  places.forEach((p) => {
    const tag = p.properties.mainTag
    if (placesByTag.has(tag)) {
      placesByTag.set(tag, [...placesByTag.get(tag)!, p])
    } else {
      placesByTag.set(tag, [p])
    }
  })

  return (
    <div>
      {[...placesByTag.entries()].map(([tag, places], index) => {
        return (
          <div key={index}>
            <h2
              className="pt-8 text-3xl font-semibold underline decoration-4 underline-offset-4 sm:text-4xl"
              style={{ textDecorationColor: tagColors[tag] }}
            >
              {capitalizeFirstLetter(tagLabel(lang)[tag])}
            </h2>
            <ul>
              {places.map((p, j) => {
                return (
                  <li key={j} className="py-2">
                    <h3 className="pt-4 pb-2 text-lg font-semibold md:text-xl">{p.properties.title}</h3>
                    <div className="max-w-[300px]">
                      <PlacePropertiesCard lang={lang} props={p.properties} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
