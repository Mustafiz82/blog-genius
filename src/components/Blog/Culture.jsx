import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import React from 'react';

const Culture = () => {
    return (
        <div>

            <div className='flex mt-16  justify-between items-center'>
                <h2 className='text-xl duration-300 font-semibold hover:text-primary  leading-0'>Culture</h2>
                <span className='text-sm cursor-pointer font duration-300 text-black/70 hover:text-primary'>View More</span>
            </div>
            <div className='mt-12'>
                {
                    blogs?.map((item, idx) => <div className='space-y-5' key={idx}>
                        <div className='mb-5'>
                            <div className="flex mt-5 gap-5 items-start justify-start   rounded-md overflow-hidden">
                                <div className="w-1/3 h-40 relative">
                                    <Image
                                        src={item?.image}
                                        alt="Blog Post Image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className=" w-2/3 ">

                                    <div className="">
                                        <h2 className="text-2xl font-semibold  mb-2">{item?.title}</h2>
                                        <p className="text-sm text-gray-600 mb-3">
                                            BY <span className='text-purple-500'>{item?.author}</span> - {item?.date}
                                        </p>
                                        <p className="leading-relaxed text-sm line-clamp-3 ">{item?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>)
                }
                {
                    blogs?.slice(0, 2).map((item, idx) => <div className='space-y-5' key={idx}>
                        <div className='mb-5'>
                            <div className="flex mt-5 gap-5 items-start justify-start   rounded-md overflow-hidden">
                                <div className="w-1/3 h-40 relative">
                                    <Image
                                        src={item?.image}
                                        alt="Blog Post Image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className=" w-2/3 ">

                                    <div className="">
                                        <h2 className="text-2xl font-semibold  mb-2">{item?.title}</h2>
                                        <p className="text-sm text-gray-600 mb-3">
                                            BY <span className='text-purple-500'>{item?.author}</span> - {item?.date}
                                        </p>
                                        <p className="leading-relaxed text-sm line-clamp-3 ">{item?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default Culture;