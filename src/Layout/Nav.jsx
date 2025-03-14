"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import "../style/toggle.css"
import "../style/search.css"
import { BiSearchAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";



const Nav = () => {

    const [isOpen, setIsOpen] = useState(false)


    const route = [
        { title: "Blog", link: "#" },
        { title: "Categories", link: "#" },
        { title: "About", link: "#" },
        { title: "Contact", link: "#" },
    ]
    return (
        <div className="relative">
            <div className='py-3 shadow-sm   flex justify-between items-center 2xl:text-lg bg-white px-5 w-full '>
                {/* <h1>hello this is nav</h1> */}
                <Image src={"/images/logo.png"} width={1000} height={1000} className='w-[250px] 2xl:w-[300px] h-auto' alt='logo' />


                <ul className='flex gap-5'>
                    {
                        route?.map((item, idx) => <li key={idx}>
                            <Link href={item?.link || "#"}>
                                {item?.title}
                            </Link>
                        </li>)
                    }

                </ul>


                <div className='flex gap-5 items-center'>


                    <div >
                        <BiSearchAlt onClick={() => setIsOpen(true)} className='text-3xl cursor-pointer' />
                    </div>

                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>

                    <Image src={"/images/profile.png"} width={1000} height={1000} className='w-[30px] 2xl:w-[30px] h-auto' alt='logo' />


                </div>
            </div>


            <div className={`${isOpen ? "translate-y-0" : "-translate-y-full"} absolute flex gap-4 flex-col duration-500 py-5 items-center top-0 w-full h-[300px] bg-white shadow-sm `}>
                <IoCloseOutline onClick={() => setIsOpen(false)} className="text-7xl leading-0 cursor-pointer" />
                <h2 className='text-xl font-semibold'>Type and hit Enter to search
                </h2>
                <div className="relative "  >
                    <input className=' border duration-200 border-gray-400 px-5 py-3 rounded-full  focus:outline-0 focus:border-gray-600 w-[600px]   ' type="text" placeholder='Search blogs ...' />
                    <div className='bg-primary absolute top-[5px] right-[5px] rounded-full flex justify-center items-center  w-10 h-10 p-2'>
                        <BiSearchAlt className='text-2xl text-white  ' />
                    </div>
                </div>

                <h3 > <span className='font-semibold text-black/80'> Popular Search : </span><span className='text-purple-500'>#</span> travel <span className='text-blue-400'>#</span> tech <span className='text-green-500'>#</span> Gadget </h3>
            </div>
        </div>
    );
};

export default Nav;