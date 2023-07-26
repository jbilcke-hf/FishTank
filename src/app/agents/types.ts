export type AgentType = 'ant' | 'fish' | 'fox' | 'smith' | 'city' | 'dungeon'

export interface Scene {
  action: string
  position: string
  light: string
  actionnables: string[]
  prompt: string
}

export interface Agent {
  title: string
  type: AgentType
  simulate: () => Scene
}
