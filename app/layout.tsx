import './globals.css'
import type { Metadata } from 'next'
import { Fira_Mono, Poppins } from 'next/font/google'

const FiraMono = Fira_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Nuake Engine',
  description: 'A modern game engine inspired by Quake',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={FiraMono.className}>{children}</body>
    </html>
  )
}
