import React from 'react';
import { HiSparkles } from 'react-icons/hi2';

const Title = ({blogData, setBlogData }) => {

    const handleChange = (e) => {
        setBlogData(prev => ({
          ...prev,  // Preserve other data
          title: e.target.value  // Update only title
        }));
      };

      console.log(blogData);

    return (
        <div className="my-20">
            <h1 className=' text-3xl font-semibold'>
                What's your blog title ?
            </h1>

            <div className='flex items-center justify-between my-5 border-b w-full p-2 text-2xl font-medium'>
                <input
                    type="text"
                    placeholder="Building the Future: Coding My Way Through Innovation"
                    value={blogData?.title || ""}
                    className=" w-full focus:outline-0"
                    onChange={handleChange}
                />


                <div className="group relative flex h-fit cursor-pointer justify-center">
                    {/* Hover button */}
                    <HiSparkles className="text-primary " />

                    {/* Hover Text */}
                    <div className="absolute -top-12 cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-top-16 group-hover:opacity-100">
                        <p className="h-fit rounded-md bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#9333EA] text-sm px-3 py-2 text-white shadow-[0px_0px_10px_0px_#6366F1]">
                            Generate with AI
                        </p>
                        <span className="absolute -bottom-2 left-[50%] h-0 w-0 -translate-x-1/2 rotate-[135deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#6366F1] shadow-[0px_0px_10px_0px_#6366F1]"></span>
                    </div>
                </div>


            </div>



        </div>
    );
};

export default Title;