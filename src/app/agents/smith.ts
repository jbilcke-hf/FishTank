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

export const agent: Agent = {
  title: "Smith",
  type: "smith",
  simulate: (): Scene => {
    const action = pick(actions)
    const position = pick(positions)

    const prompt = [
      `static medium shot of Agent Smith from the Matrix`,
      `wearing a black costume with black tie and black sunglasses`,
      action,
      position,
      `high res`,
      `documentary`,
    ].join(", ")

    return {
      action,
      position,
      prompt
    }
  }
}