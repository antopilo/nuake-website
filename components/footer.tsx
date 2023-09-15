
import Link from "next/link"
import { cn } from "@/lib/utils"

import styles from './footer.module.css'

export function Footer() {
  return (
    <img alt="Nuake Logo" className={styles.footer} src="/nuake-logo.svg"></img>
  )
}