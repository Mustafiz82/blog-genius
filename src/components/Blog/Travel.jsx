import { blogs } from '@/app/Data/BlogData';
import React from 'react';
import VerticalCard from './VerticalCard';

const Travel = () => {
    return (
        <div>

            <h2 className='text-xl duration-300 font-semibold hover:text-primary mt-20 leading-0'>Travel</h2>
            <div className='grid mt-8 grid-cols-3 gap-5'>
            {
                blogs?.map((item , idx) => <VerticalCard
                key={idx}
                item={item}
                />)
            }
        </div>
        </div>
    );
};

export default Travel;