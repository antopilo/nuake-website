import { FC } from 'react'
import { Navbar } from '@/components/navbar'
import styles from "./blog.module.css"

export default function BlogPage () {
    const newBlog = {
        "name": "Particle system",
        "date": "Monday, July 20, 2023",
        "desc": "New particle system now available on master",
        "url": '/blog/blog-test'
    }
    const blogPosts = [
        {
            "name": "Sprites & billboards",
            "date": "Sprites & billboards",
            "desc": "New 3D sprite system and billboard behavior",
            "url": '/blog/blog-test'
        }
    ]

    return ( 
        <div>
            <Navbar />
            <div className={styles.blogPageWrapper}>
                <div className={styles.blogPageContainer}>
                    <a href="/blog/blog-test">
                        <div className={styles.mainBlogItem}>
                            <div className={styles.dateLabelMain}>
                                <p className={styles.dateLabelText}>{newBlog.date}</p>
                            </div>
                            <div className={styles.cardBottom}>
                                <p className={styles.cardTitle}>{newBlog.name}</p>
                                <p className={styles.cardDesc}>{newBlog.desc}</p>
                            </div>
                        </div>
                    </a>

                    {blogPosts.map((blogPost) => (
                        <a href={blogPost.url}>
                        <div className={styles.blogItem}>
                            <div className={styles.blogItemImg}></div>
                            <div className={styles.blogItemRight}>
                                <div className={styles.dateLabel}>
                                    <p className={styles.dateLabelText}>{blogPost.date}</p>
                                </div>
                                <p className={styles.cardTitle}>{blogPost.name}</p>
                                <p className={styles.cardDesc}>{blogPost.desc}</p>
                            </div>
                        </div>
                    </a>
                    ))}

                </div>
            </div>
        </div>
    )
}

