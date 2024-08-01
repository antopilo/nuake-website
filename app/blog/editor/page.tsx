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

async function fetchBlogPosts() {
  const GITHUB_REPO_OWNER = "YOUR_USERNAME";
  const GITHUB_REPO_NAME = "YOUR_REPO";
  const GITHUB_API_TOKEN = "YOUR_TOKEN";
  
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/`;
    const headers = {
        Authorization: `token ${GITHUB_API_TOKEN}`,
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

const EditorPage = () => {
  const [data, setData] = useState([]);
  const [content, setContent] = useState(''); // State to store file content

  useEffect(() => {
    // This code will run on the client side
    const fetchData = async () => {
      const blogPosts = await fetchBlogPosts(); // Await the promise
      console.log(blogPosts); // Log the resolved data
      setData(blogPosts); // Set the state with the resolved data
    };

    fetchData(); // Call the async function

  }, []);
  const ref = React.useRef<MDXEditorMethods>(null)

  const fetchFileContent = async (fileName: string) => {
    
    try {
      const GITHUB_REPO_OWNER = "YOUR_USERNAME";
      const GITHUB_REPO_NAME = "YOUR_REPO";
      const GITHUB_API_TOKEN = "YOUR_TOKEN";

      const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${fileName}`;
      const headers = {
          Authorization: `token ${GITHUB_API_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
      };
      const response = await axios.get(apiUrl, { headers});
      const decodedContent = Buffer.from(response.data.content, 'base64').toString('utf8');
      setContent(decodedContent); // Store file content

      ref.current?.setMarkdown(decodedContent)
      console.log(content)
    } catch (error) {
      console.error('Error fetching file content:', error);
      setContent('Error loading content.');
    }
  };

  
  return (
    <div>
      
        <Navbar></Navbar>
        <div className="bodyContainer">
          {/* List of files */}
          <div className="fileList">
            <h2>Available Blog Posts</h2>
              <ul>
              {data.length > 0 ? (
                data.map((file) => (
                  <li key={file.name}>
                  <button onClick={() => fetchFileContent(file.name)}>
                    {file.name}
                  </button>
                </li>
                ))
              ) : (
                <li>No blog posts found.</li>
              )}
            </ul>
          </div>
            {content ? <MdxEditor editorRef={ref} markdown={content} /> : <p>Select a file to view its content.</p>}
        </div>
        <Footer></Footer>
    </div>
  );
};

export default EditorPage;