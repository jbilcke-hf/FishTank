import { pick } from "./pick"
import { Agent, Scene } from "./types"

const actions = [
  "not moving",
  "walking in",
  "looking up",
  "looking down",
  "looking left",
  "looking right",
  "looking around"
]

const positions = [
  "corridor with a beautiful wooden door at the end, wooden floor and stone walls",
  "a beautiful wooden door",
  "beautiful room with stone walls and wooden floor",
  "large ball room with stone pillars, stone floor and red carpet",
  "a cosy room with a fireplace, stone walls and wooden floor",
  "a fireplace with stone walls",
  "a cold dungeon with stone walls",
  "a damp medieval jail cell with stone walls and wooden floor"
]

const times = [
  "lit through windows",
  "lit through wall-mounted torchs"
  // "poorly lit"
]

export const agent: Agent = {
  title: "Dungeon",
  type: "dungeon",
  simulate: (): Scene => {
    const action = pick(actions)
    const position = pick(positions)
    const time = pick(times)

    const prompt = [
      `first-person footage`,
      action,
      position,
      time,
      `medieval`,
      `photography`,
      `documentary`,
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
