"use client"
import React, { useState } from 'react';
import dynamic from "next/dynamic";
let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});


const Blog = ({setBlogData}) => {

    const [content, setContent] = useState(null);

    return (
        <div className="py-5 px-5 my-16 mb-5 bg-white/50 rounded-lg">
        <h1 className='mb-5 text-3xl font-semibold'>
            Write description of your blog.
        </h1>


        <Editor
            data={content}
            onChange={(e) => setContent(e)}
            holder="editor_create"
            setBlogData={setBlogData}
        />

    </div>
    );
};

export default Blog;