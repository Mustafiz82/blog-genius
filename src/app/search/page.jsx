"use client"
import VerticalCard from '@/components/Blog/VerticalCard';
import blogService from '@/Service';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';

const page = () => {

    const searchParams = useSearchParams()
    const query = searchParams.get("q")
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    if (!query) {
        return <div className="flex flex-col gap-5 justify-center items-center h-[500px]">
            <div className='bg-primary  rounded-full flex justify-center items-center w-20 h-20 p-2'>
                <BiSearchAlt className='text-5xl text-white' />
            </div>
            <h2 className='text-2xl font-semibold'>No Search Keyword Detected</h2>
        </div>
    }


    useEffect(() => {
        const handleSearch = async () => {
            setLoading(true)
            try {
                const res = await blogService.searchBlogs({
                    query: query
                })
                setData(res?.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }

        handleSearch()
    }, [query])




    return (
        <div className='w-full min-h-screen bg-[#F6F6F6]'>
            <div className='!container  px-5 lg:px-10 py-10 mx-auto '>
                <h1 className='text-2xl font-semibold'>{loading ? "Searching" : "Search"} Result For "{query}"</h1>

                <div className='grid  mt-8 grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        loading ? Array.from({ length: 3 })?.map((item, idx) => <div key={idx} className=" w-full animate-pulse mx-auto ">
                            <div className="  bg-gray-200  aspect-video  duration-500 w-full">

                            </div>

                            <div className="my-5">
                                <div className="h-8 w-full bg-gray-200   mb-2"></div>
                                <div className="h-3 bg-gray-200  w-[30%] mb-3">

                                </div>
                                <p className={"w-full h-3 bg-gray-200 my-1"}></p>
                                <p className={"w-full h-3 bg-gray-200 my-1"}></p>
                                <p className={"w-[90%] h-3 bg-gray-200 my-1"}></p>
                            </div>
                        </div>)
                            : data?.map((item, idx) => <VerticalCard item={item} key={idx} />)}
                </div>

                {data?.length == 0 && !loading && <p className=' italic'>No result Found</p>}


            </div>
        </div>
    );
};

export default page;