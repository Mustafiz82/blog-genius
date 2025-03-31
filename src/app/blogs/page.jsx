import Banner from '@/components/Blog/Banner';
import Business from '@/components/Blog/Business';
import Culture from '@/components/Blog/Culture';
import Lifestyle from '@/components/Blog/Lifestyle';
import SideContent from '@/components/Blog/SideContent';
import Technology from '@/components/Blog/Technology';
import Travel from '@/components/Blog/Travel';
import React from 'react';

const page = () => {
    return (
        <div className='w-full bg-[#F6F6F6]'>


            <div className='container  px-10 py-10 mx-auto '>
                <Banner />
                <Travel />
                <div className='grid gap-5 grid-cols-3 '>
                    <div className='col-span-2'>
                        <div className=' grid grid-cols-2 gap-5'>
                            <Technology />
                            <Business />
                        </div>
                        <Lifestyle />
                        <Culture />

                    </div>

                    <SideContent />


                </div>

            </div>
        </div>
    );
};

export default page;