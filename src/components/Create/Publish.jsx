"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "prismjs/themes/prism.css";
import "../../style/unreset.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { renderEditorJSContent } from '@/Helper/renderEditorJSContent';





export default function Publish({ blogData: blogdetail }) {

    function getBlogCreationDate(blogId) {
        const timestamp = parseInt(blogId.split('_')[1]);
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }


    return (
        <div className='w-full bg-white/70 my-8 md:my-20 p-4 md:p-8 max-w-4xl mx-auto'>
            <div className='col-span-2'>
                <div className="mt-5 ">
                    <span className=" bg-primary font-medium text-white text-xs uppercase px-2 py-1">
                        {blogdetail?.category}
                    </span>
                    <h1 className='!text-3xl mt-2'>
                        {blogdetail?.title}
                    </h1>
                    <p className="text-sm text-gray-600 my-2">
                        BY <span className='text-purple-500 uppercase'>{blogdetail?.authorName}</span> - {getBlogCreationDate(blogdetail?.id)}
                    </p>
                </div>

                <Image
                   src={URL.createObjectURL(blogdetail.thumbnail)}
                    alt={blogdetail?.title}
                    width={600} // Adjust as needed
                    height={300} // Adjust as needed

                    objectFit="cover"
                    className="block pt-3 object-cover w-full aspect-[9:16] group-hover:scale-110 duration-500 "
                />

                <div className=''>
                    <div className='flex   !relative gap-10'>
                        
                        <div className='prose max-w-full  '>
                            {renderEditorJSContent(blogdetail?.blog?.blocks)}
                        </div>

                    </div>

                    <div className='text-sm py-3 mt-10 border-y-black/30 flex justify-between'>
                        <div className=' flex gap-2'>
                            {
                                blogdetail?.tags?.map((item, idx) => <div key={idx} className="p-2 bg-transparent border text-sm font-semibold text-black/70 border-gray-400 uppercase ">{item}</div>)
                            }
                        </div>

                        <div>
                           
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
}