export const dynamic = "force-dynamic";
import { blogs } from '@/app/Data/BlogData';
import HorizontalCard from '@/components/Blog/HorizontalCard';
import SideContent from '@/components/Blog/SideContent';
import VerticalCard from '@/components/Blog/VerticalCard';
import TopBlog from '@/components/blogCategories/TopBlog';
import blogService from '@/Service';
import React from 'react';

const page = async ({ params }) => {
    const category = params?.categories;

    const res = await blogService.getBlogByCategory(category);

    // Get the current date when the data is fetched
    const fetchDate = new Date().getTime(); // This formats the current date

    console.log(res?.data); 
    console.log('Data fetched at: ', fetchDate);

    return (
        <div className='!container w-full mx-auto px-5 md:px-10 py-14'>
            <p className='uppercase text-center text-[12px] text-black/70 '>Category</p>
            <h1 className='text-center'>{(params?.categories).toUpperCase()}</h1>
            
            {/* Show the date when the data is fetched */}
            <div className='text-center my-4'>
                <p className='text-gray-500 text-sm'>Data fetched at: {fetchDate}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5">
                <div className='col-span-2'>
                    <TopBlog data={res?.data?.[0]} />
                    <div className='mt-14'>
                        {
                            res?.data?.slice(1, res?.data?.length)?.map((item, idx) => (
                                <div key={idx}>
                                    <div className='md:hidden'>
                                        <VerticalCard key={idx} item={item} />
                                    </div>
                                    <div className='hidden md:block'>
                                        <HorizontalCard categoryPage item={item} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='md:mt-[124px] w-full'>
                    <SideContent />
                </div>
            </div>
        </div>  
    );
};

export default page;
