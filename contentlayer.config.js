import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
}

export const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: `blog-source/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string'
        },
        date: {
            type: 'string',
            required: true,
        },
        published: {
            type: 'boolean',
            default: true
        },
        author: {
            type: 'string',
            required: true
        },
        img: {
            type: 'string',
            default: 'https://cdn.antopilo.dev/images/nuakebanner.png'
        }
    },
    computedFields
}))

const syncContentFromCDN = async (contentDir) => {
    const syncRun = async () => {
        const url = 'https://cdn.antopilo.dev/blog'
        
    }

    let wasCancelled = false
    let syncInterval

    const syncLoop = async () => {
        await syncRun()

        if(wasCancelled) return;

        syncInterval = setTimeout(syncLoop, 1000 * 60);
    }

    await syncLoop()

    return () => {
        wasCancelled = true;
        clearTimeout(syncInterval)
    }
}

export default makeSource({
    syncFiles: syncContentFromCDN,
    contentDirPath: 'content',
    documentTypes: [Doc],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    onVisitLine(node) {
                        // Prevent lines from collapsing in dispkay agrid mode and allow
                        // empty lines to be copy pasted.
                        if(node.children.length == 0) {
                            node.children = [{type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className.push('word-highlighted')
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    }
})