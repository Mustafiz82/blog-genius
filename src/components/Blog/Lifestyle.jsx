import React from 'react';
import VerticalCard from './VerticalCard';
import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import CategoryTitle from '../common/CategoryTitle';

const Lifestyle = () => {
    return (
        <div>
             <CategoryTitle title={"lifestyle"} />

            <div className="grid mt-5 gap-5 grid-cols-2">
                <VerticalCard item={blogs?.[0]} />
                <div className='grid grid-cols-2 gap-5'>
                    {
                        blogs?.slice(1, 5)?.map((item, idx) => <div className='space-y-5' key={idx}>

                            <div className="  gap-10 items-start   rounded-sm overflow-hidden">
                                <div className="w-full h-28 relative">
                                    <Image
                                        src={item?.image}
                                        alt="Blog Post Image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className=" w-full mt-2 font-medium ">
                                    <h4 className="!text-base font-medium">{item?.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{item?.date}</p>
                                </div>
                            </div>

                        </div>)
                    }
                    {
                        blogs?.slice(1, 5)?.map((item, idx) => <div className='space-y-5' key={idx}>

                            <div className="  gap-10 items-start   rounded-md overflow-hidden">
                                <div className="w-full h-32 relative">
                                    <Image
                                        src={item?.image}
                                        alt="Blog Post Image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className=" w-full mt-2 font-medium ">
                                    <h4 className="!text-base font-medium">{item?.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{item?.date}</p>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Lifestyle;