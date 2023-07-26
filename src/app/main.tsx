"use client"

import { useEffect, useRef, useState, useTransition } from "react"

import { VideoPlayer } from "@/components/business/video-player"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { render } from "./render"
import { Agent, AgentType, Scene } from "./agents/types"
import { agents, defaultAgent, getAgent } from "./agents"

export default function Main() {
  const [url, setUrl] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const [scene, setScene] = useState<Scene>()
  const ref = useRef<AgentType>(defaultAgent)
   
  useEffect(() => {
    
    const updateView = async () => {
      // console.log(`update view..`)

      await startTransition(async () => {

        // console.log(`getting agent..`)
        const type = ref?.current
        const agent = getAgent(type)

        // console.log(`asking agent to determine things..`)
        const scene = agent.simulate()

        // console.log(`rendering scene..`)
        const newUrl = await render(scene.prompt)

        if (type !== ref?.current) {
          console.log("agent type changed! reloading scene")
          setTimeout(() => { updateView() }, 0)
          return
        } 

        if (newUrl) {
          // console.log(`got a new url: ${newUrl}`)
          setUrl(newUrl)
          setScene(scene)
          setTimeout(() => { updateView()}, 1000)
        } else {
          // console.log(`going to wait a bit more: ${newUrl}`)
          setTimeout(() => { updateView()}, 3000)
        }
      })
    }

    updateView()

  }, [])

  return (
    <div className="flex flex-col w-full pt-4">
      <div className="flex flex-col space-y-3 px-2">
        <div className="flex flex-row items-center space-x-3">
          <label className="flex">Agent model:</label>
          <Select
            defaultValue={defaultAgent}
            onValueChange={(value) => {
              ref.current = value as AgentType
              // setUrl("")
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(agents).map(([key, agent]) =>
              <SelectItem key={key} value={key}>{agent.title}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        {(scene) ? <div>
          <p>Action: {scene.action}</p>
          <p>Position: {scene.position}</p>
        </div> : null}
      </div>
      <VideoPlayer url={url} />
    </div>
  )
}