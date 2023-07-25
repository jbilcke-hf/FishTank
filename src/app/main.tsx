"use client"

import { useEffect, useState, useTransition } from "react"

import { VideoPlayer } from "@/components/business/video-player"
import { renderScene } from "./renderScene"
import { Scene } from "./scenes/types"
import { getScene } from "./scenes/ants"

export default function Main() {
  const [url, setUrl] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const [scene, setScene] = useState<Scene>()
   
  useEffect(() => {
    
    const updateView = async () => {
      console.log(`update view..`)

      startTransition(async () => {

        console.log(`generating new scene..`)
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