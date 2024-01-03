import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RubStream | Searching',
  description: 'Rubstream, watch and relax',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className='flex items-center gap-5 fixed top-0 left-0 w-full h-fit p-3 z-30 bg-slate-800'>
          <a href="/" className='p-1 rounded bg-accent text-white'>Inicio</a>
        </header>
        {children}
      </body>
    </html>
  )
}
