"use server"
import React from 'react';
import Newsletter from '../Home/Newsletter';
import { blogs } from '@/app/Data/BlogData';
import VerticalCard from './VerticalCard';
import CategoryList from './CategoryList';
import blogService from '@/Service';

const SideContent = async () => {
    try {
        const res = await blogService.getPopularBlog();
        // console.log(res?.data);

        return (
                <div className='mt-9'>
                    <Newsletter blog />

                    <h2 className='text-xl text-center mt-16 duration-300 font-semibold hover:text-primary leading-0'>Popular</h2>

                    <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-1 gap-5">
                        {
                        res?.data?.map((item, idx) => <VerticalCard hideDesc={true} key={idx} item={item} />)
                        }
                    </div>

                    <CategoryList />

            </div>
        );
    } catch (error) {
        console.error("Error fetching popular blogs:", error);
    } 

    


};

export default SideContent;
