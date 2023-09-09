import Link from "next/link"
import { cn } from "@/lib/utils"

import styles from './nav-bar.module.css'

export function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.navbarContainer}> 
        <a href="/">
            <img className={styles.logo} src="/nuake-logo.svg" />
        </a>
        <div className={styles.navigation}>
            <a href="/" className={styles.navLink}>home</a>
            <a href="/blog" className={styles.navLink}>news</a>
            <a href="/#faq" className={styles.navLink}>faq</a>
            <a href="https://discord.gg/VdR3E8HNec" className={styles.navLink}><img className={styles.navIcon} src="/discord.svg"/></a>
        </div>
        </div>

    </div>

  )
}