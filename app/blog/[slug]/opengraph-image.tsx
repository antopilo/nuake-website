import { ImageResponse } from 'next/server'
import { allDocs } from "contentlayer/generated"

export const runtime = 'edge'
 
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
async function getDocFromParams(slug: string) {
    const doc = allDocs.find((doc) => doc.slugAsParams === slug)
    return doc
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getDocFromParams(params.slug)
    
  return new ImageResponse(
    (
        <div style={{height: '100%', width: '100%'}}>
          About Me
        </div>
    ),
    {
      ...size,
    }
  )
}