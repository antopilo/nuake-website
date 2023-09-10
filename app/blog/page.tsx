import { Navbar } from "@/components/navbar"
import styles from "./blog.module.css"

export default function BlogPage () {
    const newBlog = {
        "name": "Hello World",
        "date": "Saturday, August 9, 2023",
        "desc": "Website is live!",
        "url": '/blog/blog-test'
    }
    const blogPosts = [
        {
            "name": "Sprites & billboards",
            "date": "Sprites & billbsoards",
            "desc": "New 3D sprite system and billboard behavior",
            "url": '/blog/blog-tests'
        }
    ]

    let blogHtml = []

    for(let i = 0; i < blogPosts.length; i++)
    {
        blogHtml.push(
            <a href={blogPosts[i].url}>
                        <div className={styles.blogItem}>
                            <div className={styles.blogItemImg}></div>
                            <div className={styles.blogItemRight}>
                                <div className={styles.dateLabel}>
                                    <p className={styles.dateLabelText}>{blogPosts[i].date}</p>
                                </div>
                                <p className={styles.cardTitle}>{blogPosts[i].name}</p>
                                <p className={styles.cardDesc}>{blogPosts[i].desc}</p>
                            </div>
                        </div>
                    </a>
        )
    }
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

                    {blogHtml}
                </div>
                <p style={{marginTop: "100px", marginBottom: "100px"}}>More to come 🚧</p>
            </div>
        </div>
    )
}

