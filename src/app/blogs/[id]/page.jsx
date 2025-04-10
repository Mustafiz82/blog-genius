import SideContent from '@/components/Blog/SideContent';
import BlogDetail from '@/components/BlogDetails/BlogDetail';
import blogService from '@/Service';
import React from 'react';


const page = async ({params}) => {

    const id = params.id
    console.log(id);

    const res = await blogService.getSingleBlogs(id)

    return (
        <div className='!container grid grid-cols-1 lg:grid-cols-3 gap-12  px-5 md:px-10 py-10 mx-auto '>
            <BlogDetail  data={res?.data} />

            <div className='md:mt-24'>
                <SideContent />
            </div>
        </div>
    );
};

export default page;