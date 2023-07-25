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

import { renderScene } from "./renderScene"
import { Scene } from "./scenes/types"

import { getScene as getSceneAnts } from "./scenes/ants"
import { getScene as getSceneFishes } from "./scenes/fishTank"

type SceneType = 'ant' | 'fish'

const types: {
  label: string
  value: SceneType
}[] = [
  {
    label: "Ant",
    value: "ant"
  },
  {
    label: "Fish",
    value: "fish"
  }
]

export default function Main() {
  const [url, setUrl] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const [scene, setScene] = useState<Scene>()
  const ref = useRef<SceneType>()
   
  useEffect(() => {
    
    const updateView = async () => {
      console.log(`update view..`)

      startTransition(async () => {

        console.log(`generating new scene..`)
        const type = ref?.current
        const newScene = type === 'ant' ? getSceneAnts() : getSceneFishes()

        const newUrl = await renderScene(newScene.prompt)

        if (type !== ref?.current) {
          console.log("scene type changed while we were rendering")
          setTimeout(() => { updateView() }, 0)
          return
        } 

        // console.log(`newUrl: ${newUrl}`)
        setUrl(newUrl)
        setScene(newScene)
        setTimeout(() => { updateView()}, 2000)
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
            defaultValue={"fish" as SceneType}
            onValueChange={(value) => {
              ref.current = value as SceneType
              setUrl("")
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map(({ label, value }) =>
              <SelectItem key={value} value={value}>{label}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        {url ? <div>
          <p>Action: {scene?.action}</p>
          <p>Position: {scene?.position}</p>
        </div> : null}
      </div>
      <VideoPlayer url={url} />
    </div>
  )
}