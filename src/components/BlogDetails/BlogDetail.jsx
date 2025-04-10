"use client"
import React from 'react';
import { FaHeart, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { renderEditorJSContent } from '@/Helper/renderEditorJSContent';
import { getBlogCreationDate } from '@/Helper/extractDate';
import Image from 'next/image';
import { blogdetail } from '@/app/Data/BlogData';
import PostReact from './PostReact';

const BlogDetail = ({ data }) => {




    console.log(data);
    return (
        <div className='md:col-span-2'>
            <div className="mt-5 ">
                <span className=" bg-primary font-medium text-white text-xs uppercase px-2 py-1">
                    {data?.category}
                </span>
                <h1 className='!text-3xl mt-2'>
                    {data?.title}
                </h1>
                <p className="text-sm text-gray-600 my-2">
                    BY <span className='text-purple-500 uppercase'>{data?.authorName}</span> - {getBlogCreationDate(data?.id)}
                </p>
            </div>

            <Image
                src={data?.thumbnail}
                alt={data?.title}
                width={1000} // Adjust as needed
                height={1000} // Adjust as needed
                priority
                unoptimized

                objectFit="cover"
                className=" pt-3 object-cover w-full aspect-video group-hover:scale-110 duration-500 "
            />

            <div className=''>
                <div className='flex   !relative gap-10'>
                    <div className='hidden md:block !sticky self-start top-5 '>
                        <div className="flex mt-8 max-w-[50px] flex-col items-center gap-4 ">
                            <div className="flex mt-8 max-w-[50px] flex-col items-center gap-4">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?._id}`)}`} target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF className="cursor-pointer border border-gray-400 p-2 rounded-full text-4xl hover:bg-primary text-[#1877F2] hover:text-white duration-300 transition" />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?._id}`)}&text=${encodeURIComponent(data?.title)}`} target="_blank" rel="noopener noreferrer">
                                    <FaXTwitter className="cursor-pointer border border-gray-400 p-2 rounded-full text-4xl hover:bg-primary hover:text-white duration-300 transition" />
                                </a>
                                <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?._id}`)}&media=${data?.thumbnail}&description=${encodeURIComponent(data?.title)}`} target="_blank" rel="noopener noreferrer">
                                    <FaPinterestP className="cursor-pointer border border-gray-400 p-2 rounded-full text-4xl hover:bg-primary text-[#E60023] hover:text-white duration-300 transition" />
                                </a>
                                <a href={`mailto:?subject=${encodeURIComponent(data?.title)}&body=Check this out: ${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?._id}`)}`} target="_blank" rel="noopener noreferrer">
                                    <HiOutlineMail className="cursor-pointer border border-gray-400 p-2 rounded-full text-4xl hover:bg-primary hover:text-white duration-300 transition" />
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className='prose  mt-5 '>
                        {renderEditorJSContent(data?.blog?.blocks)}
                    </div>

                </div>

                <div className='text-sm py-3 mt-10 border-y-black/30 flex flex-col md:flex-row gap-5 md:gap-0 justify-between'>
                    <div className='hidden md:flex gap-2'>
                        {
                            data?.tags?.map((item, idx) => <div key={idx} className="p-2 bg-transparent border font-semibold text-black/70 border-gray-400 uppercase ">{item}</div>)
                        }
                    </div>

                    <div>
                        <div className="flex justify-between  items-center gap-4  md:justify-center text-gray-700">
                            {/* Like Button */}
                         <PostReact reactCount={data?.reactCount} id={data?._id}/>

                            {/* Divider */}
                            <div className="h-6 w-px bg-gray-300" />

                            {/* Social Icons */}
                            <div className="flex items-center gap-4">
                                {/* Facebook */}
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?.id}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebookF className="cursor-pointer border border-gray-400 p-1 rounded-full text-2xl  md:text-xl lg:text-2xl hover:bg-primary  hover:text-white duration-300 transition" />
                                </a>

                                {/* Twitter / X */}
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?.id}`)}&text=${encodeURIComponent(data?.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaXTwitter className="cursor-pointer border border-gray-400 p-1 rounded-full text-2xl  md:text-xl lg:text-2xl hover:bg-primary hover:text-white duration-300 transition" />
                                </a>

                                {/* Pinterest */}
                                <a
                                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?.id}`)}&media=${data?.thumbnail}&description=${encodeURIComponent(data?.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaPinterestP className="cursor-pointer border border-gray-400 p-1 rounded-full text-2xl  md:text-xl lg:text-2xl hover:bg-primary hover:text-white duration-300 transition" />
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(data?.title)}&body=Check this out: ${encodeURIComponent(`https://bloggeniusai.vercel.app/blogs/${data?.id}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <HiOutlineMail className="cursor-pointer border border-gray-400 p-1 rounded-full text-2xl  md:text-xl lg:text-2xl hover:bg-primary hover:text-white duration-300 transition" />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default BlogDetail;