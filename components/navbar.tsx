import Link from "next/link"
import { cn } from "@/lib/utils"

import styles from './nav-bar.module.css'

export function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.navbarContainer}> 
        <Link aria-label="Home Link" href="/">
            <img alt="Nuake Logo" className={styles.logo} src="/nuake-logo.svg" />
            <img alt="Nuake Logo Icon" className={styles.logoIcon} src="/icon.svg" />
        </Link>
        <div className={styles.navigation}>
            <Link aria-label="Home link" href="/" className={styles.navLink}>home</Link>
            <Link aria-label="News link" href="/blog" className={styles.navLink}>news</Link>
            <Link aria-label="FAQ link" href="/#faq" className={styles.navLink}>faq</Link>
            <Link aria-label="Docs" href="https://nuake.readthedocs.io/en/latest/index.html" className={styles.navLink}>docs</Link>
            <Link aria-label="Discord link" href="https://discord.gg/VdR3E8HNec" className={styles.navLink}><img alt="Discord Icon" className={styles.navIcon} src="/discord.svg"/></Link>
            <Link aria-label="Github link" href="https://github.com/antopilo/nuake" className={styles.navLink}><img alt="Github Icon" className={styles.navIcon} src="/github-mark.svg"/></Link>
        </div>
        </div>

    </div>

  )
}