"use client"

import { useEffect, useState, useTransition } from "react"

import { VideoPlayer } from "@/components/business/video-player"
import { renderScene } from "./renderScene"


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

const pick = (items: string[]) => items[Math.floor(Math.random()*items.length)]

const getScene = () => {
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