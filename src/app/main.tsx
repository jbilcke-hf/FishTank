"use client"

import { useEffect, useState, useTransition } from "react"

import { VideoPlayer } from "@/components/business/video-player"
import { renderScene } from "./renderScene"

const initialScene = `medium shot of a single clownfish idling near a yellow coral, underwater footage, the clownfish is in the middle of the screen`

const actions = [
  "idling",
  "eating",
  "looking at camera"
]

const positions = [
  "swimming in the middle",
  "swimming from left to right",
  "swimming from right to left"
]

const pick = (items: string[]) => items[Math.floor(Math.random()*items.length)]

const getScene = () => {
  const action = pick(actions)
  const position = pick(positions)

  const prompt = [
    `medium shot of a single clownfish ${action}, ${position}",
    "in front of yellow coral`,
    `underwater footage`,
  ].join(", ")

  return {
    action,
    position,
    prompt
  }
}

interface Scene {
  action: string
  position: string
  prompt: string
}

export default function Main() {
  const [url, setUrl] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const [scene, setScene] = useState<Scene>()
   
  useEffect(() => {
    
    const updateView = async () => {
      console.log(`update view..`)

      startTransition(async () => {

        console.log(`generating new fish tank frames..`)
        const newScene = getScene()

        const newUrl = await renderScene(newScene.prompt)
        console.log(`newUrl: ${newUrl}`)
        setUrl(newUrl)
        setScene(newScene)

        setTimeout(() => {
          updateView()
        }, 2000)
      })
    }

    updateView()

  }, [])

  return (
    <div className="flex flex-col w-full">
      <VideoPlayer url={url} />
      <div>
        <p>Action: {scene?.action}</p>
        <p>Position: {scene?.position}</p>
      </div>
    </div>
  )
}