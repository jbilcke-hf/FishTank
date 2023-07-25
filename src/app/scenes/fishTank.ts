import { pick } from "./pick"

const actions = [
  "idling",
  "making bubbles",
  "making circles",
  "opening and closing its mouth",
  // "with an octopus",
  "playing with another fish",
  "eating fishfood",
  "eating a crab",
  "attacked by a jellyfish"
]

const positions = [
  "at the top of the coral",
  "at the bottom of the coral",
  "centered in the middle",
  "burrowing in the sand",
  "hiding in the coral"
]

export const getScene = () => {
  const action = pick(actions)
  const position = pick(positions)

  const prompt = [
    `medium shot of a clownfish`,
    action,
    position,
    `in front of yellow coral`,
    `high res underwater footage`,
  ].join(", ")

  return {
    name: "FishTank",
    action,
    position,
    prompt
  }
}
