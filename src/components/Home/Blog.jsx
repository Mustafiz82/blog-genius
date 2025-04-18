import React from 'react';
import VerticalCard from '../Blog/VerticalCard';
import { blogs } from '@/app/Data/BlogData';
import Link from 'next/link';
import blogService from '@/Service';



const Blog = async () => {


    const res = await blogService.getLatestBlogs()



    return (
        <div className=''>
            <div className='grid  mx-5 lg:mx-10 gap-5 mt-5 lg:mt-12 grid-cols-1 md:grid-cols-3 ' >
                {
                    res?.data?.map((item, idx) => <VerticalCard key={idx} item={item} />)
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