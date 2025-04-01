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

            <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-1 gap-5">
            {
                blogs?.map((item , idx) => <VerticalCard hideDesc key={idx} item={item}/>)
            }
            
            </div>

            <CategoryList/>
        </div>
    );
};

export default SideContent;