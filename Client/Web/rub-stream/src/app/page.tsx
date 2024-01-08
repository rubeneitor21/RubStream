"use client"

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'

import Folder from './components/Folder'
import Video from './components/Video'

export default function Home() {

  const [items, setItems] = useState([] as any)
  // const router = useRouter()
  const route = useRef("")
  // const lastRoute = useRef("")

  useEffect(() => {
    async function getItems(route: string) {
      console.log(route)
      let retrieveItems = await (await fetch(`http://localhost:5000/list/${route}`)).json()

      console.log(retrieveItems)
      setItems(retrieveItems)
    }
    function handleFolderClick(event: Event) {
      const target = event.target as HTMLElement
      // console.log(target.parentElement?.id)
      if (target?.id === "folder" || target.parentElement?.id == "folder") {
        let ele = target as HTMLInputElement
        let href = ele.parentElement?.getAttribute("x-href") as string

        console.log(route.current.split("/").slice(0, -1).join("/"))
        getItems(href)
        route.current = href
      }
    }
    document.addEventListener("click", handleFolderClick)
    getItems("")
  }, [])

  return (
    <main className={`mt-9 p-3 grid grid-cols-1 sm:grid-cols-${Math.min(items.length, 2)} md:grid-cols-${Math.min(items.length, 3)} lg:grid-cols-${Math.min(items.length, 4)} xl:grid-cols-${Math.min(items.length, 5)} 2xl:grid-cols-${Math.min(items.length, 6)} justify-items-center items-center gap-2 min-h-screen bg-background justify-center`}>

      {route.current != '' ? <Folder href={route.current.split("/").slice(0, -1).join("/")} name='Back'></Folder> : <></>}

      {items.map((item: any, i: any) => (
        item.type == "folder" ? <Folder key={item.url} href={item.url} name={item.name} /> : <></>
      ))}

      {items.map((item: any, i: any) => (
        item.type == "file" ? <Video key={i} href={item.url} name={item.name} /> : <></>
      ))}

    </main>
  )
}
