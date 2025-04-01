import { blogs } from '@/app/Data/BlogData';
import HorizontalCard from '@/components/Blog/HorizontalCard';
import SideContent from '@/components/Blog/SideContent';
import VerticalCard from '@/components/Blog/VerticalCard';
import TopBlog from '@/components/blogCategories/TopBlog';
import React from 'react';

const page = () => {
    
    return (
        <div className='!container w-full mx-auto px-5 md:px-10 py-14'>
            <p className='uppercase text-center text-[12px] text-black/70 '>Category</p>
            <h1 className='text-center'>Business</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5">
                <div className='col-span-2'>
                    <TopBlog />
                    <div className='mt-14'>
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
                            blogs?.map((item, idx) => <div key={idx}>
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
                <div className='md:mt-[124px] w-full'>
                    <SideContent />
                </div>
            </div>

        </div>
    );
};

export default page;