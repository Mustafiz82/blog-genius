"use client"
import { blogdetail } from '@/app/Data/BlogData';
import SideContent from '@/components/Blog/SideContent';
import { renderEditorJSContent } from '@/Helper/renderEditorJSContent';
import Image from 'next/image';
import React from 'react';
import { FaHeart, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const page = () => {

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
        <div className='!container grid grid-cols-1 lg:grid-cols-3 gap-12  px-5 md:px-10 py-10 mx-auto '>
            <div className='md:col-span-2'>
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
                    src={blogdetail?.thumbnail}
                    alt={blogdetail?.title}
                    width={600} // Adjust as needed
                    height={300} // Adjust as needed
                    priority

                    objectFit="cover"
                    className="block pt-3 object-cover w-full aspect-[9:16] group-hover:scale-110 duration-500 "
                />

                <div className=''>
                    <div className='flex   !relative gap-10'>
                        <div className='hidden md:block !sticky self-start top-5 '>
                            <div className="flex mt-8 max-w-[50px] flex-col items-center gap-4 ">
                                <FaFacebookF className="cursor-pointer border border-gray-400  p-2 rounded-full text-4xl hover:bg-primary text-[#1877F2] hover:text-white duration-300 transition" />
                                <FaXTwitter className="cursor-pointer border border-gray-400  p-2 rounded-full text-4xl hover:bg-primary  hover:text-white duration-300 transition" />
                                <FaPinterestP className="cursor-pointer border border-gray-400  p-2 rounded-full text-4xl hover:bg-primary text-[#E60023] hover:text-white duration-300 transition" />
                                <HiOutlineMail className="cursor-pointer border border-gray-400  p-2 rounded-full text-4xl hover:bg-primary  hover:text-white duration-300 transition" />
                            </div>
                        </div>
                        <div className='prose  '>
                            {renderEditorJSContent(blogdetail?.blog?.blocks)}
                        </div>

                    </div>

                    <div className='text-sm py-3 mt-10 border-y-black/30 flex flex-col md:flex-row gap-5 md:gap-0 justify-between'>
                        <div className='hidden md:flex gap-2'>
                            {
                                blogdetail?.tags?.map((item, idx) => <div key={idx} className="p-2 bg-transparent border font-semibold text-black/70 border-gray-400 uppercase ">{item}</div>)
                            }
                        </div>

                        <div>
                            <div className="flex justify-between  items-center gap-4  md:justify-center text-gray-700">
                                {/* Like Button */}
                                <div className="flex text-primary items-center gap-2 ">
                                    <FaHeart className="cursor-pointer b transition" />
                                    <span>57</span>
                                </div>

                                {/* Divider */}
                                <div className="h-6 w-px bg-gray-300" />

                                {/* Social Icons */}
                                <div className="flex items-center gap-4 ">
                                    <FaFacebookF className="cursor-pointer border border-gray-400  p-1 rounded-full text-2xl md:text-xl hover:bg-primary  hover:text-white duration-300 transition" />
                                    <FaXTwitter className="cursor-pointer border border-gray-400  p-1 rounded-full text-2xl md:text-xl hover:bg-primary  hover:text-white duration-300 transition" />
                                    <FaPinterestP className="cursor-pointer border border-gray-400  p-1 rounded-full text-2xl md:text-xl hover:bg-primary  hover:text-white duration-300 transition" />
                                    <HiOutlineMail className="cursor-pointer border border-gray-400  p-1 rounded-full text-2xl md:text-xl hover:bg-primary  hover:text-white duration-300 transition" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <div className='md:mt-24'>
                <SideContent />
            </div>
        </div>
    );
};

export default page;