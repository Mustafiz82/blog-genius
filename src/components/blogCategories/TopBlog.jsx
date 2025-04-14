import React from 'react';
import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import { FaHeart, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import Link from 'next/link';
import { extractDescription } from '@/Helper/extractDesctiption';
import PostReact from '../BlogDetails/PostReact';

const TopBlog = ({ data }) => {



    function getBlogCreationDate(blogId) {
        const timestamp = parseInt(blogId?.split('_')[1]);
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }


    const stripHtml = (text) => text?.replace(/<\/?[^>]+(>|$)/g, "");



    return (
        <div>

            <div className=''>
                <div className="mt-10 lg:mt-16 ">
                    <span className=" bg-primary text-white text-xs uppercase px-2 py-1">
                        {data?.category}
                    </span>
                    <h1 className='text-2xl lg:!text-3xl mt-2'>
                        {data?.title}
                    </h1>
                    <p className="text-sm text-gray-600 my-2">
                        BY <span className='text-purple-500'>{data?.authorName}</span> - {getBlogCreationDate(data?.id)}
                    </p>
                </div>

                <Image
                    src={data?.thumbnail}
                    alt={data?.title}
                    width={600} // Adjust as needed
                    height={300} // Adjust as needed
                    // quality={    80}
                    objectFit="cover"
                    unoptimized
                    className="block aspect-video group-hover:scale-110 duration-500 w-full"
                />

                <p className='leading-relaxed text-justify md:text-left my-4'>{stripHtml(data?.description)}</p>

                <div className="flex justify-center my-10">
                    <Link href={`/blogs/${data?._id}`}>
                        <button className='uppercase hover:border-transparent text-black/70 border-black/70 hover:text-white hover:bg-primary duration-300  font-semibold px-4 py-2 border bg-gray-200'>
                            Keep Reading
                        </button></Link>
                </div>

                <div className='text-sm md:px-10 border-t border-b py-3 border-y-black/30 flex justify-between'>
                    <p>By <span className='text-purple-500  '>{data?.authorName}</span></p>

                    <div>
                        <div className="flex items-center gap-4  justify-center text-gray-700">
                            {/* Like Button */}
                            <PostReact reactCount={data?.reactCount} id={data?._id} />

                            {/* Divider */}
                            <div className="h-6 w-px bg-gray-300" />

                            {/* Social Icons */}
                            <div className="flex items-center gap-4 ">
                                <FaFacebookF className="cursor-pointer hover:text-primary transition" />
                                <FaXTwitter className="cursor-pointer hover:text-primary transition" />
                                <FaPinterestP className="cursor-pointer hover:text-primary transition" />
                                <HiOutlineMail className="cursor-pointer hover:text-primary transition" />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default TopBlog;