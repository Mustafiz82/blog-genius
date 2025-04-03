import React from 'react';
import VerticalCard from './VerticalCard';
import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import CategoryTitle from '../common/CategoryTitle';

const Lifestyle = ({ data }) => {
    return (
        <div>
            <CategoryTitle title={"lifestyle"} />

            <div className="grid mt-5 gap-5 gird-cols-1 md:grid-cols-2">
                <VerticalCard item={data?.[0]} />
                <div className='grid grid-cols-2 gap-5'>
                    {
                        data?.slice(1, 5)?.map((item, idx) => <div className='space-y-5' key={idx}>

                            <div className="  gap-10 items-start   rounded-sm overflow-hidden">


                                <Image
                                    src={item?.thumbnail}
                                    alt={item?.title}
                                    width={600}
                                    quality={20}

                                    height={400}
                                    unoptimized // Add this line to disable Next.js optimization
                                    className="block h-32  object-cover group-hover:scale-110 duration-500 w-full"
                                />

                                <div className=" w-full mt-2 font-medium ">
                                    <h4 className="!text-base line-clamp-2 font-medium">{item?.title}</h4>
                                    <p className="text-sm  text-gray-500 mt-1">{item?.date}</p>
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