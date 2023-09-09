import Link from "next/link"
import { cn } from "@/lib/utils"

import styles from './blogHeader.module.css'

interface BlogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  description?: string,
  date: string,
  author: string
}

export function BlogHeader({
    title,
    description, 
    date,
    author
}: BlogHeaderProps) {
  return (
    <div className={styles.headerContainer}>
        <div className={styles.date}>
            <p>{date}</p>
        </div>
        <h1 className={styles.blogTitle}>{title}</h1>
        <div className={styles.description}>
            <p>{description}</p>
        </div>
        <div className={styles.author}>
            <p>By: @<b className={styles.authorName}>{author}</b></p>
        </div>
    </div>
  )
}