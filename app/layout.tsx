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
      <script defer src="https://cloud.umami.is/script.js" data-website-id="e60e33aa-11c5-468b-a092-5a36a037b61e"></script>
      <body className={FiraMono.className}>{children}</body>
    </html>
  )
}
