import Link from 'next/link';
import React from 'react';

const CategoryTitle = ({ title }) => {
    return (
        <div className='flex mt-10  justify-between items-center'>
            <h2 className='text-xl duration-300 font-semibold hover:text-primary capitalize leading-0'>{title}</h2>
            <Link href={`/blogs/${title}`}>
                <span className='text-sm cursor-pointer font duration-300 text-black/70 hover:text-primary'>View More</span>
            </Link>
        </div>
    );
};

export default CategoryTitle;