import { Agent, AgentType } from "./types"

import { agent as ant } from "./ant"
import { agent as fish } from "./fish"
import { agent as fox } from "./fox"
import { agent as smith } from "./smith"
import { agent as city } from "./city"
import { agent as dungeon } from "./dungeon"

export const agents = { ant, fish, fox, smith, city, dungeon }

export const defaultAgent: AgentType = "dungeon"

export const getAgent = (type?: AgentType) => agents[type || defaultAgent] || agents[defaultAgent]