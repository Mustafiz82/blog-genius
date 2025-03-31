import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import React from 'react';

const Banner = () => {


    return (
        <div className='grid grid-cols-7 '>
            {
                blogs?.map((item, idx) => <div 
                key={idx}
                className={`relative group overflow-hidden h-[500px]  2xl:h-[600px] w-full ${idx == 0 ? "col-span-3" : "col-span-2"}`}>
                    {/* Background Image (Replace with your actual image path) */}
                    <Image
                        src={item?.image}
                        alt="Interview Background"
                        width={1000}
                        height={1000}
                        objectFit="cover"
                        className=' w-full group-hover:scale-110 duration-500 object-cover h-full '
                    />

                    {/* Overlay with Content */}
                    <div className="absolute  bg-gradient-to-b from-black/0 to-black/30 inset-0 flex flex-col justify-end p-8 text-white">
                        <span className="bg-primary w-fit px-2 py-1 rounded-sm text-xs font-semibold uppercase mb-2">
                            {item?.category}
                        </span>
                        <h1 className={` font-bold mb-4  ${idx == 0 ? "!text-3xl 2xl:!text-4xl" : "!text-2xl 2xl:!text-3xl"}`}>{item?.title}</h1>
                        <p className="text-sm">{item?.author} - {item?.date}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Banner;