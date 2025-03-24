"use client"
import React, { useState } from 'react';
import dynamic from "next/dynamic";
let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});


const Blog = ({blogData, setBlogData}) => {

    const [content, setContent] = useState(null);

    const newdata= {
        "title": "Your Blog Title",
        "thumbnail": "your-thumbnail-file-object",
        "blog": {
          "time": 1742750953188,
          "blocks": [
            {
              "id": "header1",
              "type": "header",
              "data": {
                "text": "Welcome to My Blog",
                "level": 2
              }
            },
            {
              "id": "paragraph1",
              "type": "paragraph",
              "data": {
                "text": "This is a sample paragraph to introduce the topic."
              }
            },
            {
              "id": "image1",
              "type": "image",
              "data": {
                "file": {
                  "url": "https://your-image-url.com/image.jpg"
                },
                "caption": "An amazing image",
                "withBorder": true,
                "stretched": false,
                "withBackground": false
              }
            },
            {
              "id": "list1",
              "type": "list",
              "data": {
                "style": "unordered",
                "items": [
                  "First bullet point",
                  "Second bullet point",
                  "Third bullet point"
                ]
              }
            },
            {
              "id": "quote1",
              "type": "quote",
              "data": {
                "text": "This is an inspiring quote!",
                "caption": "— Author Name",
                "alignment": "center"
              }
            },
            {
              "id": "table1",
              "type": "table",
              "data": {
                "content": [
                  ["Name", "Age", "Country"],
                  ["John", "30", "USA"],
                  ["Emma", "28", "UK"],
                  ["Amit", "35", "India"]
                ]
              }
            },
            {
              "id": "code1",
              "type": "code",
              "data": {
                "code": "console.log('Hello, World!');"
              }
            },
            {
              "id": "checklist1",
              "type": "checklist",
              "data": {
                "items": [
                  { "text": "Write blog content", "checked": true },
                  { "text": "Upload images", "checked": false },
                  { "text": "Publish post", "checked": false }
                ]
              }
            },
            {
              "id": "delimiter1",
              "type": "delimiter",
              "data": {}
            },
            {
              "id": "raw1",
              "type": "raw",
              "data": {
                "html": "<div style='color: red;'>Custom raw HTML block</div>"
              }
            }
          ],
          "version": "2.28.2"
        }
      }
      

    return (
        <div className="py-5 px-5 my-16 mb-5 bg-white/50 rounded-lg">
        <h1 className='mb-5 text-3xl font-semibold'>
            Write description of your blog.
        </h1>


        <Editor
            data={blogData?.blog}
            onChange={(e) => setContent(e)}
            holder="editor_create"
            setBlogData={setBlogData}
      
        />

    </div>
    );
};

export default Blog;