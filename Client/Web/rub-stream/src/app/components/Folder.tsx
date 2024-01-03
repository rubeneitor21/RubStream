"use client"

export default function Folder({ name, href }: { name: string, href: string }) {

    // console.log(href)

    return (
        <div id="folder" x-href={href} x-type="folder" className="animation-enter folder cursor-pointer w-full rounded text-white h-3/4 border border-details hover:border-[#c52233] hover:shadow-lg hover:shadow-[#c52233] duration-150 ease-in-out">
            <div className="h-full flex justify-center items-center">
                <div>{name}</div>
            </div>
        </div>
    )

}