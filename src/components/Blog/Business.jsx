import { blogs } from '@/app/Data/BlogData';
import React from 'react';
import VerticalCard from './VerticalCard';
import Image from 'next/image';
import CategoryTitle from '../common/CategoryTitle';

const Business = () => {
    return (
        <div>
             <CategoryTitle title={"business"} />

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