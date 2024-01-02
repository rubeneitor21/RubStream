"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const [items, setItems] = useState([] as any)
  const [route, setRoute] = useState("")

  useEffect(() => {
    async function getItems(route: string) {
      console.log(route)
      let retrieveItems = await (await fetch(`http://localhost:5000/list/${route}`)).json()


      console.log(retrieveItems)
      setItems(retrieveItems)
    }
    getItems("movies")
  }, [])

  return (
    <main className='grid grid-cols-1 sm:grid-cols-4 justify-items-center items-center gap-2 min-h-screen bg-background justify-center'>
      {items.map((item: any, i: any) => (
        <div key={i}>{item.name}</div>
      ))}
    </main >
  )
}
