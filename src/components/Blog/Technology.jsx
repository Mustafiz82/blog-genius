import { blogs } from '@/app/Data/BlogData';
import React from 'react';
import VerticalCard from './VerticalCard';
import Image from 'next/image';
import CategoryTitle from '../common/CategoryTitle';

const Technology = ({ data }) => {
    return (
        <div>
            <CategoryTitle title={"technology"} />

            <div className='mt-5'>
                {
                    data?.map((item, idx) => <div className='space-y-5' key={idx}>
                        {
                            idx == 0 ? <VerticalCard item={item} /> : <div>
                                <div className="flex mt-5 gap-5 items-start   rounded-md overflow-hidden">
                                    <Image
                                        src={item?.thumbnail}
                                        alt={item?.title}
                                        width={600}
                                        quality={30}
                                        height={400}
                                        unoptimized // Add this line to disable Next.js optimization
                                        className="block w-1/3 h-20  aspect-video object-cover group-hover:scale-110 duration-500 "
                                    />
                                    <div className=" w-2/3 ">
                                        <h4 className="!text-base font-medium">{item?.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{item?.date}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>)
                }</div>
        </div>
    );
};

export default Technology;