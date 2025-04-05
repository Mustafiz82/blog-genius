"use client"
import blogService from '@/Service';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const { session } = useSession()

    useEffect(() => {
        const handleSearch = async () => {
            setLoading(true)
            try {
                const res = await blogService.getMyBlogs({
                    email: session?.user?.email
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
    }, [session])

    return (
        <div className='w-full min-h-screen bg-[#F6F6F6]'>
            <div className='!container  px-5 lg:px-10 py-10 mx-auto '>

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

                {data?.length == 0 && !loading && <div>
                    <div className="flex flex-col  items-center mt-8">
                        {/* Icon section: You can use an icon library like Font Awesome */}
                        <h2 className="text-2xl font-bold mt-4">No Blogs Yet</h2>
                        <p className="text-gray-500 my-2 mb-5 text-center max-w-md">
                            It looks like you haven’t written any blog posts. Click the button below to get started!
                        </p>
                      
                        <Link href={"/create"}>
                            <button className='hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md'>
                                Write With AI
                            </button>
                        </Link>
                    </div>
                </div>}


            </div>
        </div>
    );
};

export default page;