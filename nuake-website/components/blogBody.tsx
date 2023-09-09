import Link from "next/link"
import { cn } from "@/lib/utils"
import { Mdx } from '@/components/Mdx'
import styles from './blogBody.module.css'

interface BlogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
}

export function BlogBody({
    code
}: BlogBodyProps) {
  return (
    <div className={styles.blogBodyContainer}>
        <Mdx code={code} />
    </div>
  )
}