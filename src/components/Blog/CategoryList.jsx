import React from 'react';

const CategoryList = () => {
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

                {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-gray-800">{category.name}</span>
                        </div>
                        <span className="text-gray-500">({category.count})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;