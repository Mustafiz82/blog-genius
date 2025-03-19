import React from 'react';
import BlogCard from '../Blog/BlogCard';

const Blog = () => {
    return (
        <div>
            <div className='grid mx-10 gap-5 mt-12 grid-cols-3 ' >
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
            </div>
        </div>
    );
};

export default Blog;