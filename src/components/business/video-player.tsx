"use client"

export const VideoPlayer = ({ url }: { url?: string }) => {

  if (!url) {
    return <div className="flex w-full h-screen items-center justify-center text-center">
      <div>Connecting to FishTank live stream..</div>
    </div>
  }

  return (
    <div className="w-full py-8 px-2">
       <video
          src={url}
          muted
          autoPlay
          loop
          className="w-full rounded-md overflow-hidden"
        />
    </div>
  )
}