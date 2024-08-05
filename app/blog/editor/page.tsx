// pages/client-side-page.js
"use client"
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Editor from '@/components/editorComponent';
import path from 'path';
import matter from 'gray-matter';
import axios from 'axios';
import React from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { signIn, signOut, useSession } from 'next-auth/react';
import { BlogHeader } from '@/components/blog-header';

const MdxEditor = dynamic(() => import('@/components/editorComponent'), { ssr: false })

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

async function fetchBlogPosts(accessToken: string | undefined) {
  const GITHUB_REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const GITHUB_REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO;
  const GITHUB_API_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  if(accessToken)
  {
    const apiUrl = `https://api.github.com/repos/antopilo/NuakeBlog/contents/`;
    const headers = {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      const files = response.data;
      const mdxFiles = files
              .filter((file: any) => file.name.endsWith('.mdx'))
              .map((file: any) => ({
                  name: file.name,
                  download_url: file.download_url,
              }));
  
  
      return mdxFiles;
    } catch(error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }
  return [];
}

async function updateFileOnGitHub(message:string, fileName: string, newContent: string, sha: string, accessToken: string) {
  try {
    const GITHUB_API_BASE = 'https://api.github.com';
    const GITHUB_REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    const GITHUB_REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO;

    const headers = {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    };

    const fetchapiUrl = `https://api.github.com/repos/antopilo/NuakeBlog/contents/${fileName}`;
    const response = await axios.get(fetchapiUrl, { headers });
    const decodedContent = Buffer.from(response.data.content, 'base64').toString('utf8');

    const receivedSha = response.data.sha

    const updatedContentBase64 = Buffer.from(newContent, 'utf8').toString('base64');

    const commitApiUrl = `${GITHUB_API_BASE}/repos/antopilo/NuakeBlog/contents/${fileName}`;
    const commitResponse = await axios.put(commitApiUrl, {
      message: `Update ${fileName} - ` + message,
      content: updatedContentBase64,
      sha: receivedSha, // The SHA of the file to update
    }, { headers });

    alert("Changes pushed successfully ✅")
    console.log('File updated successfully:', commitResponse.data);

    return commitResponse.data;

  } catch (error) {
    alert("Failed to push changes ❌")
    console.error('Error updating file on GitHub:', error);
    throw error;
  }
}

type File = {
  name: string;
  download_url: string;
};

const EditorPage = () => {
  const [data, setData] = useState<File[]>([]);
  const [content, setContent] = useState({
    fileName: '',
    fileData: '',
    fileSha: '',
    fileHeader: {}
  }); // State to store file content

  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if(status === "authenticated" && session?.accessToken)
    {
      const fetchData = async () => {
        const accessToken = session?.accessToken as string | undefined; // Type assertion for accessToken
        console.log(session)
        const blogPosts = await fetchBlogPosts(accessToken); // Await the promise
        console.log(blogPosts); // Log the resolved data
        setData(blogPosts); // Set the state with the resolved data
      };
  
      fetchData(); // Call the async function
    }
  }, [status, session]);
  const ref = React.useRef<MDXEditorMethods>(null)

  async function push(message: string) {
    try {
      updateFileOnGitHub(message, content.fileName, ref.current?.getMarkdown() || "", content.fileSha, session?.accessToken || "")
      // Success
      setContent(prevContent => ({
        ...prevContent,
        fileName: content.fileName,
        fileData: ref.current?.getMarkdown() || content.fileData,
        fileSha: content.fileSha
    }));
      console.log("power")
    }catch(err) {
      alert("Failed to push changes")
      console.log("err")
    }

  }

  async function onChangeCB(e: any) {
    const { data, content } = matter(e);
        
    setContent(prevContent => ({
                ...prevContent,
                fileHeader: data
            }));
  }

  const fetchFileContent = async (fileName: string) => {
    
    try {
      const accessToken = session?.accessToken as string | undefined
      if(accessToken)
      {
        const apiUrl = `https://api.github.com/repos/antopilo/NuakeBlog/contents/${fileName}`;
        const headers = {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        };
        const response = await axios.get(apiUrl, { headers });
        const decodedContent = Buffer.from(response.data.content, 'base64').toString('utf8');

        const { data, content } = matter(decodedContent);
        
        setContent(prevContent => ({
                    ...prevContent,
                    fileName: fileName,
                    fileData: decodedContent,
                    fileSha: response.data.sha,
                    fileHeader: data
                }));


        ref.current?.setMarkdown(decodedContent);
        console.log(content);
      }

    } catch (error) {
      console.error('Error fetching file content:', error);
      setContent(prevContent => ({
        ...prevContent,
        fileData: 'Error loading content.'
    }));
    }
  };
  
  return (
    <div>
        <Navbar></Navbar>
        <div className="auth-container">
          
          {!session ? (
            <div className='protected'>
              <h1>❗This page is protected ❗</h1>
              
              <p>You need to be authorized to access this page.</p>
              <button onClick={() => signIn('github')}>Sign in with GitHub</button>
            </div>
          ) : (
            <div>
              <div className="bodyContainer">
                
          {/* List of files */}
          <div className="fileList">
            <h4 className='file-title'>Available Files:</h4>
            <p>Select a file to view its content.</p>
            <p>----------------------------------</p>
              <ul>
              {data.length > 0 ? (
                data.map((file) => (
                  <li key={file.name || ""} className="file-link">
                  <button onClick={() => fetchFileContent(file.name)}>
                    {file.name}
                  </button>
                </li>
                ))
              ) : ( <div></div>
              )}
            </ul>
          </div>
            {content.fileData ? 
              <>
                <BlogHeader
                    title={content.fileHeader.title || "No title"}
                    description={content.fileHeader.description || "No description"}
                    date={content.fileHeader.date || "No date"}
                    author={content.fileHeader.author || "No author"} 
                />
                <MdxEditor pushCallback={push} onChangeCallback={onChangeCB} editorRef={ref} markdown={content.fileData} />
              </> : <p></p>}
        </div>
              
            </div>
          )}
        </div>
        
        <Footer></Footer>
        <div className="center">
          { !session ? <p></p> : <button onClick={() => signOut()}>Sign out</button>}
        </div>
        
    </div>
  );
};

export default EditorPage;