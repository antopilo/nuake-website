import * as React from "react"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { cn } from "@/lib/utils"
import { Callout } from "@/components/callout"
import { MdxCard } from "@/components/mdx-card"

import styles from './mdx.module.css'
import { Poppins } from "next/font/google"
const poppins = Poppins({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']})

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>)  => (
    <h1
      className={[cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight header1",
        className
      ), poppins.className].join(" ")}
      style={{marginBottom: '16px', marginTop: '32px'}}
      {...props}
    />
  ),
  h2: ({ className, ...props } : React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={[cn(
        "mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      ), poppins.className].join(' ')}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={[cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      ), poppins.className].join(" ")}
      {...props}
    />
  ),
  h4: ({ className, ...props } : React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props } : React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props } : React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props } : React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props } : React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={[cn("leading-7 [not(:first-child)]:mt-6", className), poppins.className].join(" ")}
      style={{padding: '8px 8px 8px 8px', fontSize: 15}}
      {...props}
    />
  ),
  ul: ({ className, ...props } : React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={[cn("ml-6 list-disc", className), poppins.className].join(" ")} {...props}
    style={{padding: '0px 32px 0px', fontSize: 15}} />
  ),
  ol: ({ className, ...props } : React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={[cn("ml-6 list-decimal", className), poppins.className].join(" ")} {...props} 
    style={{padding: '0px 0px 0px', fontSize: 15}}/>
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={[cn("mt-2", className), poppins.className].join(" ")} {...props} 
    style={{padding: '0px 32px 0px', fontSize: 15}}/>
  ),
  blockquote: ({ className, ...props } : React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-4 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      style={{borderColor: "#6100FF"}}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props } : React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props } : React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props } : React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props } : React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card: MdxCard,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return (
    <div className={styles.articleBody}>
      <Component components={components}></Component>
    </div>
  )
}