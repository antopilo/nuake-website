"use client";

import { MDXEditor, MDXEditorMethods, 
    headingsPlugin, imagePlugin, ImageUploadHandler, quotePlugin, listsPlugin, thematicBreakPlugin,
    UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, codeBlockPlugin, InsertImage, 
    SandpackConfig,
    sandpackPlugin,
    codeMirrorPlugin,
    ConditionalContents,
    InsertCodeBlock,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo,
    InsertSandpack,
    DiffSourceToggleWrapper,
    diffSourcePlugin,
    frontmatterPlugin,
    InsertFrontmatter,
    Button,
    markdownShortcutPlugin,
    InsertTable,
    BlockTypeSelect,
    CreateLink,
    InsertThematicBreak,
    ListsToggle,
    tablePlugin,
    DialogButton} from "@mdxeditor/editor";
import { list } from "postcss";
import { FC } from "react";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

async function imageUploadHandler(image: File) {
    const formData = new FormData()
    formData.append('image', image)
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch('/uploads/new', {
      method: 'POST',
      body: formData
    })
    const json = (await response.json()) as { url: string }
    return json.url
  }


/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {

  let oldMarkdown = markdown;

  return (
    <div className="mdxEditorWrapper">
        <MDXEditor
        contentEditableClassName="prose"
        className="dark-theme dark-editor"
      onChange={(e) => console.log(e)}
        ref={editorRef}
        markdown={markdown}
        plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        codeBlockPlugin({defaultCodeBlockLanguage: 'csharp'}),
        codeMirrorPlugin({ codeBlockLanguages: { cpp: 'C++', csharp: 'C#', wren: 'wren' } }),
        imagePlugin(),
        frontmatterPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin({
          diffMarkdown: oldMarkdown,
          viewMode: 'rich-text',
          readOnlyDiff: true
        }),
        toolbarPlugin({
            toolbarContents: () => (
              <div className="flex">
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <InsertFrontmatter />
                  <BlockTypeSelect></BlockTypeSelect>
                  <BoldItalicUnderlineToggles />
                  <CreateLink/>
                  <InsertTable />
                  <InsertImage/>
                  <InsertThematicBreak/>
                  <ListsToggle/>
                  <ConditionalContents
                  options={[
                      { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                      { fallback: () => ( <> 
                      <InsertCodeBlock />
                    </>) }
                    ]}
                  />
                </DiffSourceToggleWrapper>,
                {'         '}
                
                <DialogButton  
                  onSubmit={(value: string) => {
                    console.log("Submitted value:", value);
                  }}
                  dialogInputPlaceholder=""
                  buttonContent="Commit & Push"
                  submitButtonTitle="Push"
                  tooltipTitle="push"
                >
                  Push
                </DialogButton>
              </div>
              
            )
          })
    ]}
    />
    </div>
    
  );
};



export default Editor;