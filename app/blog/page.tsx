import { Navbar } from "@/components/navbar"
import styles from "./blog.module.css"
import Link from "next/link"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

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
            "name": "Hello World",
            "date": "Saturday, August 9, 2023",
            "desc": "Website is now live!",
            "url": '/blog/website',
            "img_preview": 'https://cdn.antopilo.dev/RAYTRACER.png',
        },
        {
            "name": "Bones & skeletons",
            "date": "Monday, July 26, 2023",
            "desc": "New skeletal animation system and what's next",
            "url": '/blog/bones-and-skeletons',
            "img_preview": 'http://cdn.antopilo.dev/blogPreviews/nuakeSkeleton.png',
        },
        {
            "name": "Sprites & billboards",
            "date": "Tuesday, July 5, 2023",
            "desc": "New 3D sprite system and billboard behavior",
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
                        <div style={{backgroundImage: `url(${blogPosts[0].img_preview})`}} className={styles.mainBlogItem}>
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
                <p style={{marginTop: "100px", marginBottom: "100px"}}>More to come 🚧</p>
            </div>
        </div>
    )
}

