import { blogs } from '@/app/Data/BlogData';
import { getBlogCreationDate } from '@/Helper/extractDate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = ({data}) => {


    return (
        <div className='grid grid-cols-2 gap-1 md:grid-cols-6  lg:grid-cols-7'>
            {
                data?.map((item, idx) => <div 
                key={idx}
                className={`relative group overflow-hidden  md:h-[500px]  2xl:h-[600px] w-full ${idx == 0 ? "h-[250px] col-span-2 md:col-span-2 lg:col-span-3" : "col-span-1 h-[220px] md:col-span-2"}`}>
                    {/* Background Image (Replace with your actual image path) */}
                    <Image
                        src={item?.thumbnail}
                        alt="Interview Background"
                        width={1000}
                        height={1000}
                        unoptimized
                        quality={70}
                        objectFit="cover"
                        className=' w-full group-hover:scale-110 duration-500 object-cover h-full '
                    />

                    {/* Overlay with Content */}
                    <div className="absolute  bg-gradient-to-b from-black/0 to-black/50 inset-0  text-white">
                       <Link className='h-full flex flex-col justify-end p-8' href={`/blogs/${item?._id}`}>
                       <span className="bg-primary w-fit px-2 py-1 rounded-sm text-[10px] md:text-xs font-semibold uppercase mb-2">
                            {item?.category}
                        </span>
                        <h1 className={` font-bold mb-4  ${idx == 0 ? "text-xl lg:!text-3xl 2xl:!text-4xl" : "text-lg lg:text-xl 2xl:!text-2xl"}`}>{item?.title}</h1>
                        <p className="text-[11px] md:text-sm">{item?.authorName} - {getBlogCreationDate( item?.date)}</p></Link>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Banner;