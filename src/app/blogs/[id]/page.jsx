export const revalidate = 60;

import SideContent from '@/components/Blog/SideContent';
import BlogDetail from '@/components/BlogDetails/BlogDetail';
import blogService from '@/Service';
import React from 'react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const res = await blogService.getBlogIds();

    if (!res?.data) return [];

    // Filter out any items with missing _id just to be safe
    return res.data
      .filter(item => item?._id)
      .map(item => ({ id: item._id.toString() }));
  } catch (err) {
    console.error("Failed to generate static params:", err);
    return [];
  }
}

const page = async ({ params }) => {
  const id = params.id;

  try {
    const res = await blogService.getSingleBlogs(id);

    if (!res?.data) {
      return notFound(); // fallback to 404 page
    }

    return (
      <div className='!container grid grid-cols-1 lg:grid-cols-3 gap-12 px-5 md:px-10 py-10 mx-auto'>
        <BlogDetail data={res.data} />

        <div className='md:mt-24'>
          <SideContent />
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error fetching blog with id: ${id}`, error);
    return notFound(); // fallback to 404 page on fetch error
  }
};

export default page;
