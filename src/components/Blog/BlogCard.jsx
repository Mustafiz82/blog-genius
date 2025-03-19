import Image from 'next/image';
import React from 'react';

const BlogCard = () => {
    return (
            <div className="bg-white group w-full   rounded-2xl shadow-md overflow-hidden p-4  ">
                <div className="relative w-full h-52 rounded-xl overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Helmet"
                        width={500}
                        height={500}
                        className="w-full group-hover:scale-125 duration-500 h-auto object-cover"
                    />
             
                </div>
                <div className="mt-4 space-y-2">
                    <h2 className="text-lg font-semibold leading-tight">
                        Hidden Ways To Save Money That You Might Be Missing
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        By Jessica Smith <span className="ml-2">September 4, 2024</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        There are many variations of passages of Lorem Ipsum available, but the majority...
                    </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                    <span className="text-primary font-medium">#Gadget</span>
                    <div className="flex items-center gap-3">
                        <span>🔍 150 Views</span>
                        <span>⏳ 3 Min Read</span>
                    </div>
                </div>
            </div>
     
    );
};

export default BlogCard;