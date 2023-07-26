import { pick } from "./pick"
import { Agent, Scene } from "./types"

const actions = [
  "standing and waiting",
  "standing and looking at camera",
  "standing and adjusting their tie",
  "standing and talking on a cellphone",
  "standing and reading the journal"
]


const positions = [
  "on the roof of a building",
  "in the lobby of a building",
  "in an elevator",
  "on the sidewalk of a street"
]

const times = [
  "during the day",
  "during the night",
]

export const agent: Agent = {
  title: "Smith",
  type: "smith",
  simulate: (): Scene => {
    const action = pick(actions)
    const position = pick(positions)
    const time = pick(times)

    const prompt = [
      `static medium shot of Agent Smith from the Matrix`,
      `wearing a black costume with black tie and black sunglasses`,
      action,
      position,
      time,
      `high res`,
      `Matrix movie`,
    ].join(", ")

    return {
      action,
      position,
      time,
      prompt
    }
  }
}