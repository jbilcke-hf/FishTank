import { pick } from "./pick"
import { Agent, Scene } from "./types"

const actions = [
  "working on lavae",
  "slicing leaves",
  "attacking a beetle",
  "foraging",
  "cutting a sugar cube",
  "collecting sugar",
  "collecting aphids"
]

const positions = [
  "on a leave",
  "on a tree branch",
  "on sand",
  "on the ground"
]

const lights = [
  "during the day",
]

const actionnables = [
  "ant",
  "ground",
  "leaf",
  "rock",
  "wood",
  "water",
  "beetle"
]

export const agent: Agent = {
  title: "Ant",
  type: "ant",
  simulate: (): Scene => {
    const action = pick(actions)
    const position = pick(positions)
    const light = pick(lights)

    const prompt = [
      `close-up shot of a couple of ants`,
      action,
      position,
      light,
      `high res`,
      `documentary`,
    ].join(", ")

    return {
      action,
      position,
      light,
      actionnables,
      prompt
    }
  }
}
