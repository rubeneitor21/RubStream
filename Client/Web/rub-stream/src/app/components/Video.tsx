"use client"

import Link from "next/link"

export default function Folder({ name, href }: { name: string, href: string }) {


    return (
        <Link href={{ pathname: "/show", query: href }} id="file" x-type="file" className="animation-enter folder cursor-pointer w-full rounded text-white h-3/4 border border-details hover:border-[#c52233] hover:shadow-lg hover:shadow-[#c52233] duration-150 ease-in-out" onClick={() => {
            localStorage.setItem("video", JSON.stringify({
                "href": href,
                "name": name,
            }))
        }}>
            <div className="h-full flex justify-center items-center">
                <div>{name}</div>
            </div>
        </Link>
    )

}