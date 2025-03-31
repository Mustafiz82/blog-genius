import React from 'react';
import BlogCard from '../Blog/BlogCard';
import VerticalCard from '../Blog/VerticalCard';
import { blogdetail, blogs } from '@/app/Data/BlogData';
import Link from 'next/link';

const Blog = () => {
    return (
        <div>
            <div className='grid mx-10 gap-5 mt-12 grid-cols-3 ' >
                {
                    blogs?.map((item, idx) => <VerticalCard key={idx} item={item} />)
                }
                {
                    blogs?.map((item, idx) => <VerticalCard key={idx} item={item} />)
                }


            </div>
                <div className="flex w-full justify-center my-10">
                    <Link href={"/blogs"}>
                        <button className='uppercase hover:border-transparent text-black/70 border-black/70 hover:text-white hover:bg-primary duration-300  font-semibold px-4 py-2 border bg-gray-200'>
                            View All Blog
                        </button></Link>
                </div>
        </div>
    );
};

export default Blog;