import { pick } from "./pick"

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

export const getScene = () => {
  const action = pick(actions)
  const position = pick(positions)

  const prompt = [
    `close-up shot of a couple of ants`,
    action,
    position,
    `high res`,
    `documentary`,
  ].join(", ")

  return {
    name: "Ants",
    action,
    position,
    prompt
  }
}
