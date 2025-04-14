import blogService from '@/Service';
import Link from 'next/link';
import React from 'react';

const CategoryList = async () => {

    const res = await blogService.getBlogNumberByCategory()
    console.log(res?.data);
    const categories = [
        { name: 'Business', count: 8 },
        { name: 'Food', count: 10 },
        { name: 'Lifestyle', count: 8 },
        { name: 'Technology', count: 11 },
        { name: 'Travel', count: 8 },
    ];

    return (
        <div>
            <h2 className='text-xl text-center my-10 duration-300 font-semibold hover:text-primary  leading-0'>Categories</h2>
            <div className="space-y-4">

                {res?.data?.data?.map((item) => (
                    <Link  href={`/blogs/category/${item?.category}`} key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-gray-800">{item.category}</span>
                        </div>
                        <span className="text-gray-500">({item.count})</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;