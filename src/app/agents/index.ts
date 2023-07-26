import { Agent, AgentType } from "./types"

import { agent as ant } from "./ant"
import { agent as fish } from "./fish"
import { agent as fox } from "./fox"
import { agent as smith } from "./smith"

export const agents = { ant, fish, fox, smith }

export const defaultAgent: AgentType = "fish"

export const getAgent = (type?: AgentType) => agents[type || defaultAgent] || agents[defaultAgent]