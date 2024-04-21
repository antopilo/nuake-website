import { Navbar } from "@/components/navbar"
import styles from "./blog.module.css"
import Link from "next/link"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Footer } from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
// read route params then fetch data
    // return an object
    return {
        title: "Nuake Engine - news",
        description: "The latest news about Nuake engine",
    };
}

export default function BlogPage () {
    const blogPosts = [
        {
            "name": "April 2024",
            "date": "Saturday, April 20, 2024",
            "desc": "C#, Spatialized Audio, Triggers, Post-processing and a bunch more",
            "url": '/blog/april2024',
            "img_preview": 'https://cdn.antopilo.dev/blogPreviews/april-preview.png',
        },
        {
            "name": "Hello World",
            "date": "Friday, September 15, 2023",
            "desc": "Nuake is now live on the internet🌎",
            "url": '/blog/website',
            "img_preview": 'https://media.discordapp.net/attachments/828069636012507150/1231334917053481032/nuake-live.png?ex=66257181&is=66242001&hm=13912fe07098607d4f4f5b3a313c5cea31ce6dfab95a505ca2595b888c7c48cf&=&format=webp&quality=lossless',
        },
        {
            "name": "Bones & skeletons",
            "date": "Friday, September 8, 2023",
            "desc": "Nuake now supports basic skeletal animations 🦴",
            "url": '/blog/bones-and-skeletons',
            "img_preview": 'http://cdn.antopilo.dev/blogPreviews/nuakeSkeleton.png',
        },
        {
            "name": "Sprites & billboards",
            "date": "Saturday, August 5, 2023",
            "desc": "New 3D sprite system and billboard behaviour🖼️",
            "url": '/blog/sprites-and-billboards',
            "img_preview": 'http://cdn.antopilo.dev/blogPreviews/nuakeBillboard.png',
        }
    ]

    let blogHtml = []

    for(let i = 1; i < blogPosts.length; i++)
    {
        blogHtml.push(
            <Link href={blogPosts[i].url}>
                <div className={styles.blogItem}>
                    
                    <div style={{backgroundImage: `url(${blogPosts[i].img_preview})`}} className={styles.blogItemImg}></div>
                    <div className={styles.blogItemRight}>
                        <div className={styles.dateLabel}>
                            <p className={styles.dateLabelText}>{blogPosts[i].date}</p>
                        </div>
                        <p className={styles.cardTitle}>{blogPosts[i].name}</p>
                        <p className={styles.cardDesc}>{blogPosts[i].desc}</p>
                    </div>
                </div>
            </Link>
        )
    }
    return ( 
        <div>
            <Navbar />
            <div className={styles.blogPageWrapper}>
                <div className={styles.blogPageContainer}>
                    <Link href={blogPosts[0].url}>
                        <div style={{backgroundImage: `url(${blogPosts[0].img_preview})`, backgroundSize: "contain"}} className={styles.mainBlogItem}>
                            <div className={styles.dateLabelMain}>
                                <p className={styles.dateLabelText}>{blogPosts[0].date}</p>
                            </div>
                            <div className={styles.cardBottom}>
                                <p className={styles.cardTitle}>{blogPosts[0].name}</p>
                                <p className={styles.cardDesc}>{blogPosts[0].desc}</p>
                            </div>
                        </div>
                    </Link>

                    {blogHtml}
                </div>

                <p style={{marginTop: "100px", marginBottom: "100px"}}>🏗️ More to come... 🚧</p>
            </div>
            <Footer/>
        </div>
    )
}

