
import { blogs } from '@/app/Data/BlogData';
import HorizontalCard from '@/components/Blog/HorizontalCard';
import SideContent from '@/components/Blog/SideContent';
import TopBlog from '@/components/blogCategories/TopBlog';
import React from 'react';


const page = () => {
    return (
        <div className='!container w-full mx-auto px-10 py-14'>
            <p className='uppercase text-center text-[12px] text-black/70 '>Category</p>
            <h1 className='text-center'>Business</h1>
            <div className="grid grid-cols-3 gap-5">
                <div className='col-span-2'>
                    <TopBlog />
                    <div className='mt-14'>
                        {
                            blogs?.map((item, idx) => <HorizontalCard key={idx} item={item} />)
                        }
                        {
                            blogs?.map((item, idx) => <HorizontalCard key={idx} item={item} />)
                        }
                        {
                            blogs?.map((item, idx) => <HorizontalCard key={idx} item={item} />)
                        }
                    </div>
                </div>
                <div className='mt-[124px]'>
                <SideContent />
                </div>
            </div>

        </div>
    );
};

export default page;