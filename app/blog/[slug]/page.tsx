import { FC } from 'react'
import { allDocs } from "contentlayer/generated"
import { isNullishCoalesce } from 'typescript'
import { notFound} from 'next/navigation'

import { BlogHeader } from '@/components/blog-header'
import { BlogBody } from "@/components/blogBody"
import { Navbar } from '@/components/navbar'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Footer } from '@/components/footer'

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // read route params then fetch data
        // return an object
        const doc = await getDocFromParams(params.slug)
        return {
            title: "Nuake Engine - " + doc.title,
            description: doc.description,
            openGraph: {
                siteName: "Nuake Engine",
                description: doc.description,
                title: doc.title + " - Nuake Engine",
                images: [
                    {
                        url: doc.img,
                        width: 700,
                        height: 400
                    }
                ]
            },
            twitter: {
                description: doc.description,
                title: doc.title + " - Nuake Engine",
                images: [
                    {
                        url: doc.img,
                        width: 700,
                        height: 400
                    }
                ]
            }
        };
    }

async function getDocFromParams(slug: string) {
    const doc = allDocs.find((doc) => doc.slugAsParams === slug)

    if(!doc) {
        notFound()
    }

    return doc
}

const page: FC<PageProps> = async ({ params }: PageProps) => {
    const doc = await getDocFromParams(params.slug)

    return ( <div>
        <Navbar />
        <BlogHeader
            title={doc.title} 
            description={doc.description}
            date={doc.date}
            author={doc.author}
        />
        <BlogBody code={doc.body.code} />
        <Footer/>
        </div>
        
    )
}

export default page