import { pick } from "./pick"
import { Agent, Scene } from "./types"

const actions = [
  "busy pedestrians",
  "busy traffic",
  "typical street life",
  "skyscrapper being constructed",
  "a building is on fire",
]

const positions = [
  "city center with skyscrappers",
  "city center with a hospital",
  "market area",
  "residential area with small houses",
  "residential area and houses with pools",
  "industrial area with a smoking factory",
  "beachfront area with villas",
  "theme park with one big rollercoaster"
]

const times = [
  "during the day",
  // "during the night",
]

export const agent: Agent = {
  title: "City",
  type: "city",
  simulate: (): Scene => {
    const action = pick(actions)
    const position = pick(positions)
    const time = pick(times)

    const prompt = [
      `static isometrical view of 3D rendered city`,
      action,
      position,
      time,
      `isometric`,
      `game`,
      `high res`,
    ].join(", ")

    return {
      action,
      position,
      time,
      prompt
    }
  }
}
