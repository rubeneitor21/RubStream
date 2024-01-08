"use client"
export default function Show() {

    const videoInfo = JSON.parse(localStorage.getItem("video") || "{}")
    const videoTime = JSON.parse(localStorage.getItem("current") || "{}")
    let time = 0
    if (videoInfo?.name === videoTime?.name) {
        time = videoTime.time
        console.log(time)
    }
    return (
        <main className="bg-background">
            <video controls className="w-screen h-screen bg-backgorund" src={"http://localhost:5000" + videoInfo.href.replace("/show?", "")} onTimeUpdate={() => {
                const video = document.querySelector("video") as HTMLVideoElement
                localStorage.setItem("current", JSON.stringify({
                    "name": videoInfo.name,
                    "time": video.currentTime
                }))
                console.log("updating time")
            }} onPlay={() => {
                const video = document.querySelector("video") as HTMLVideoElement
                video.currentTime = time
                console.log(video.currentTime)
            }}></video>
        </main>
    )
}