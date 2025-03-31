import React from 'react';
import Newsletter from '../Home/Newsletter';
import { blogs } from '@/app/Data/BlogData';
import VerticalCard from './VerticalCard';
import CategoryList from './CategoryList';

const SideContent = () => {
    return (
        <div className='mt-9'>
            <Newsletter blog />

            <h2 className='text-xl text-center mt-16 duration-300 font-semibold hover:text-primary  leading-0'>Popular</h2>

            <div className="mt-10 space-y-5">
            {
                blogs?.map((item , idx) => <VerticalCard hideDesc key={idx} item={item}/>)
            }
            {
                blogs?.slice(0,1)?.map((item , idx) => <VerticalCard hideDesc key={idx} item={item}/>)
            }
            </div>

            <CategoryList/>
        </div>
    );
};

export default SideContent;