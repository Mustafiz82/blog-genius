import React from 'react';
import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import { FaHeart, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import Link from 'next/link';

const TopBlog = () => {
    return (
        <div>

            <div className=''>
                <div className="mt-16 ">
                    <span className=" bg-primary text-white text-xs uppercase px-2 py-1">
                        {blogs?.[0]?.category}
                    </span>
                    <h1 className='!text-3xl mt-2'>
                        {blogs?.[0]?.title}
                    </h1>
                    <p className="text-sm text-gray-600 my-2">
                        BY <span className='text-purple-500'>{blogs?.[0]?.author}</span> - {blogs?.[0]?.date}
                    </p>
                </div>

                <Image
                    src={blogs?.[0]?.image}
                    alt={blogs?.[0]?.title}
                    width={600} // Adjust as needed
                    height={300} // Adjust as needed

                    objectFit="cover"
                    className="block h-[450px] group-hover:scale-110 duration-500 w-full"
                />

                <p className='leading-relaxed my-2'>{blogs?.[0]?.description}</p>

                <div className="flex justify-center my-10">
                  <Link href={"/blogs/1"}>
                  <button className='uppercase hover:border-transparent text-black/70 border-black/70 hover:text-white hover:bg-primary duration-300  font-semibold px-4 py-2 border bg-gray-200'>
                        Keep Reading
                    </button></Link>
                </div>

                <div className='text-sm px-10 border-t border-b py-3 border-y-black/30 flex justify-between'>
                    <p>By <span className='text-purple-500  '>{blogs?.[0]?.author}</span></p>

                    <div>
                        <div className="flex items-center gap-4  justify-center text-gray-700">
                            {/* Like Button */}
                            <div className="flex items-center gap-2 ">
                                <FaHeart className="cursor-pointer hover:text-primary transition" />
                                <span>57</span>
                            </div>

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