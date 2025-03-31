import { blogs } from '@/app/Data/BlogData';
import React from 'react';
import VerticalCard from './VerticalCard';
import Image from 'next/image';

const Business = () => {
    return (
        <div>
            <div className='flex mt-10  justify-between items-center'>
                <h2 className='text-xl duration-300 font-semibold hover:text-primary  leading-0'>Business</h2>
                <span className='text-sm cursor-pointer font duration-300 text-black/70 hover:text-primary'>View More</span>
            </div>

            <div className='mt-5'>
                {
                    blogs?.map((item, idx) => <div className='space-y-5' key={idx}>
                        {
                            idx == 0 ? <VerticalCard item={item} /> : <div>
                                <div className="flex mt-5 gap-5 items-start   rounded-md overflow-hidden">
                                    <div className="w-1/3 h-20 relative">
                                        <Image
                                            src={item?.image}
                                            alt="Blog Post Image"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className=" w-2/3 ">
                                        <h4 className="!text-base font-medium">{item?.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{item?.date}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>)
                }
            </div>
        </div>
    );
};

export default Business;