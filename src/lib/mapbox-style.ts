import { type Expression } from "mapbox-gl"

// https://docs.mapbox.com/style-spec/reference/expressions/#match
export const matchGet = (field: string, labelOutputMapping: Record<string, string>, fallback: string) => {
  const res: Expression = ["match", ["get", field]]
  Object.entries(labelOutputMapping).forEach(([label, output]) => {
    res.push(label)
    res.push(output)
  })
  res.push(fallback)
  return res
}
