import { Navbar } from "@/components/navbar"
import styles from "./blog.module.css"
import Link from "next/link"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Footer } from "@/components/footer";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
// read route params then fetch data
    // return an object
    return {
        title: "Nuake Engine - news",
        description: "The latest news about Nuake engine",
    };
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog-source'); // Adjust the path as needed

type BlogPost = {
    name: string;
    date: string;
    desc: string;
    url: string;
    img_preview: string;
    index: number;
    slug: string;
  };

function fetchBlogPosts() {
    const files = fs.readdirSync(BLOG_DIR);

    const posts = files.map((fileName) => {
      const filePath = path.join(BLOG_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
    
      if(process.env.NODE_ENV === 'development' || data['published'] == true)
      {
        return {
            ...data,
            slug: fileName.replace('.mdx', ''),
          } as BlogPost;
      }
    }).filter((post): post is BlogPost => post !== undefined);;


    posts.sort((a, b) => (b?.index ?? 0) - (a?.index ?? 0));

    return posts;
}

export default function BlogPage () {

    let blogs: any = fetchBlogPosts();
    console.log(blogs)
    
    let blogHtml = []

    for(let i = 1; i < blogs.length; i++)
    {
        blogHtml.push(
            <Link href={/blog/ + blogs[i].slug}>
                <div className={styles.blogItem}>
                    
                    <div style={{backgroundImage: `url(${blogs[i].img})`}} className={styles.blogItemImg}></div>
                    <div className={styles.blogItemRight}>
                        <div className={styles.dateLabel}>
                            <p className={styles.dateLabelText}>{blogs[i].date}</p>
                            { !blogs[i].published && 
                                <p>Private</p>
                            }
                        </div>
                        <p className={styles.cardTitle}>{blogs[i].title}</p>
                        <p className={styles.cardDesc}>{blogs[i].description}</p>
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
                    <Link href={/blog/ + blogs[0].slug}>
                        <div style={{backgroundImage: `url(${blogs[0].img})`, backgroundSize: "contain"}} className={styles.mainBlogItem}>
                            <div className={styles.dateLabelMain}>
                                <p className={styles.dateLabelText}>{blogs[0].date}</p>
                            </div>
                            <div className={styles.cardBottom}>
                                <p className={styles.cardTitle}>{blogs[0].title}</p>
                                <p className={styles.cardDesc}>{blogs[0].description}</p>
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

