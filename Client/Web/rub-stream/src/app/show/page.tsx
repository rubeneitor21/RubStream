"use client"

import { useEffect, useState } from "react"

export default function Show() {
    const [videoInfo, setVideoInfo] = useState({} as any)
    const [videoTime, setVideoTime] = useState({} as any)

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("video") || "{}")
        const time = JSON.parse(localStorage.getItem("current") || "{}")
        setVideoInfo(info)
        if (info?.name === time?.name) {
            setVideoTime(time)
        }
        // document.addEventListener("keydown", e => {
        //     const $video = document.querySelector("video") as HTMLVideoElement
        //     if (e.key == "k") {
        //         if ($video.paused) {
        //             $video.play()
        //             $video.currentTime = JSON.parse(localStorage.getItem("current") || "{}")?.time || 0
        //         }
        //         else {
        //             $video.pause()
        //         }
        //     }
        //     else if (e.key == "ArrowLeft" || e.key == "j") {
        //         if ($video.currentTime - 5 >= 0) {
        //             $video.currentTime -= 5
        //         }
        //         else {
        //             $video.currentTime -= 5
        //         }
        //     }
        //     else if (e.key == "ArrowRight" || e.key == "l") {
        //         console.log($video.currentTime)
        //         $video.currentTime = $video.currentTime + 5
        //         console.log($video.currentTime)
        //     }
        // })
    }, [])

    return (
        <main className="bg-background">
            <video controls className="w-screen h-screen bg-backgorund" src={"http://localhost:5000" + videoInfo?.href?.replace("/show?", "")} onTimeUpdate={() => {
                const video = document.querySelector("video") as HTMLVideoElement
                localStorage.setItem("current", JSON.stringify({
                    "name": videoInfo.name,
                    "time": video.currentTime
                }))
            }} onPlay={() => {
                const video = document.querySelector("video") as HTMLVideoElement
                video.currentTime = videoTime.time
            }}>
            </video>
        </main>
    )
}