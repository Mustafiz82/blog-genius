import { extractDescription } from '@/Helper/extractDesctiption';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HorizontalCard = ({ item , quality  , categoryPage}) => {

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
        <Link href={`/blogs/${item?._id}`} className='space-y-5' >
            <div className='mb-5'>
                <div className="flex mt-5 gap-5 items-start justify-start   rounded-md overflow-hidden">
                    <div className="w-1/3 h-40 relative">

                        <Image
                            src={item?.thumbnail}
                            alt={item?.title}
                            width={600}
                            quality={quality || 30}

                            height={400}
                            unoptimized // Add this line to disable Next.js optimization
                            className="block h-full aspect-video object-cover group-hover:scale-110 duration-500 w-full"
                        />
                    </div>
                    <div className=" w-2/3 ">

                        <div className="">
                            <h2 className="text-2xl line-clamp-2 font-semibold  mb-2">{item?.title}</h2>
                            <p className="text-sm text-gray-600 mb-3">
                                BY <span className='text-purple-500'>{item?.authorName}</span> - {getBlogCreationDate(item?.id)}
                            </p>
                            <p className="leading-relaxed text-sm line-clamp-3 ">{categoryPage ? stripHtml(item?.description) : extractDescription(item) }</p>
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    );
};

export default HorizontalCard;