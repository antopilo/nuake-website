import Link from "next/link"
import { cn } from "@/lib/utils"

import styles from './nav-bar.module.css'

export function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.navbarContainer}> 
        <Link href="/">
            <img className={styles.logo} src="/nuake-logo.svg" />
        </Link>
        <div className={styles.navigation}>
            <Link href="/" className={styles.navLink}>home</Link>
            <Link href="/blog" className={styles.navLink}>news</Link>
            <Link href="/#faq" className={styles.navLink}>faq</Link>
            <Link href="https://discord.gg/VdR3E8HNec" className={styles.navLink}><img className={styles.navIcon} src="/discord.svg"/></Link>
        </div>
        </div>

    </div>

  )
}