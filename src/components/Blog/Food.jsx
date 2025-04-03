import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import React from 'react';
import HorizontalCard from './HorizontalCard';
import CategoryTitle from '../common/CategoryTitle';
import VerticalCard from './VerticalCard';

const Food = () => {
    return (
        <div>

            <CategoryTitle title={"Food"} />
            <div className='mt-5 lg:mt-12 space-y-4'>
                {
                    blogs?.map((item, idx) => <div key={idx}>
                        <div className='md:hidden'>
                            <VerticalCard key={idx} item={item} />
                        </div>
                        <div className='hidden md:block'>
                            <HorizontalCard item={item} />

                        </div>

                    </div>)
                }
                {
                    blogs?.slice(0, 2).map((item, idx) =><div key={idx}>
                    <div className='md:hidden'>
                        <VerticalCard key={idx} item={item} />
                    </div>
                    <div className='hidden md:block'>
                        <HorizontalCard item={item} />

                    </div>

                </div>)
                }
            </div>
        </div>
    );
};

export default Food;