import { blogs } from '@/app/Data/BlogData';
import Image from 'next/image';
import React from 'react';
import HorizontalCard from './HorizontalCard';
import CategoryTitle from '../common/CategoryTitle';

const Culture = () => {
    return (
        <div>

            <CategoryTitle title={"culture"} />
            <div className='mt-12'>
                {
                    blogs?.map((item, idx) => <HorizontalCard key={idx} item={item} />)
                }
                {
                    blogs?.slice(0, 2).map((item, idx) => <HorizontalCard key={idx} item={item} />)
                }
            </div>
        </div>
    );
};

export default Culture;