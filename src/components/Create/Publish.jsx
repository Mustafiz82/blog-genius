"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "prismjs/themes/prism.css";
import "../../style/unreset.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';





export default function Publish({ blogData: blog }) {
  return (
    <div className='w-full bg-white/70 my-8 md:my-20 p-4 md:p-8 max-w-4xl mx-auto'>
      <div className="relative w-full aspect-video mb-8">
        <Image 
          src={URL.createObjectURL(blog.thumbnail)}
          alt={blog.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      
      <h1 className='mb-6 text-3xl md:text-4xl font-bold text-gray-900'>{blog?.title}</h1>
      
      <div className='prose max-w-none'>
        {renderEditorJSContent(blog?.blog?.blocks)}
      </div>

      {blog.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          Written by: <span className="font-semibold text-gray-800">{blog.authorName}</span>
        </p>
      </div>
    </div>
  );
}