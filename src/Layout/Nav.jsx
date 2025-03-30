"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import "../style/toggle.css";
import "../style/search.css";
import { BiSearchAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from 'next/navigation';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const route = [
        { title: "Blog", link: "/blogs" },
        {
            title: "Categories", subcategories: [
                "Tech", "Travel", "Lifestyle", "Food", "Gadgets"
            ]
        },
        { title: "About", link: "#" },
        { title: "Contact", link: "#" },
    ];

    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup"

    return (
        <div hidden={isAuthPage} className="relative">
            <div className='py-4 shadow-sm flex justify-between items-center 2xl:text-lg bg-white px-5 w-full'>
                <h2 className='!text-2xl !font-semibold uppercase'>
                    <span className='text-primary'>Blog </span> Genius Ai
                </h2>

                <div className='flex gap-5 items-center'>
                    <ul className='flex font-light z-[999] gap-5 relative'>
                        {route.map((item, idx) => (
                            <li key={idx} className="relative group"
                                onMouseEnter={() => setDropdownOpen(idx)}
                                onMouseLeave={() => setDropdownOpen(null)}>
                                <Link href={item.link || "#"} className="flex items-center gap-1 relative">
                                    {item.title}
                                    {item.subcategories && (
                                        <IoIosArrowDown className={`text-lg transition-transform duration-300 ${dropdownOpen === idx ? "rotate-180" : "rotate-0"}`} />
                                    )}
                                </Link>
                                {item.subcategories && (
                                    <ul
                                        className={`absolute left-0 mt-2 bg-white shadow-md rounded-md p-2 w-48 transition-all duration-300 
                                        ${dropdownOpen === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                                    >
                                        {item.subcategories.map((sub, subIdx) => (
                                            <li key={subIdx} className="px-4 py-2 hover:bg-gray-100">
                                                <Link href="#">{sub}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <CiSearch onClick={() => setIsOpen(true)} className='text-3xl cursor-pointer' />
                    </div>

                    <Link href={"/login"}>
                        <button className='hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md'>
                            Login
                        </button></Link>
                </div>
            </div>

            {/* Search Box */}
            <div className={`${isOpen ? "translate-y-0" : "-translate-y-full"} absolute flex z-[999] gap-4 flex-col duration-500 py-5 items-center top-0 w-full h-[300px] bg-white shadow-sm `}>
                <IoCloseOutline onClick={() => setIsOpen(false)} className="text-7xl leading-0 cursor-pointer" />
                <h2 className='text-xl font-semibold'>Type and hit Enter to search</h2>
                <div className="relative">
                    <input className='border duration-200 border-gray-400 px-5 py-3 rounded-full focus:outline-0 focus:border-gray-600 w-[600px]' type="text" placeholder='Search blogs ...' />
                    <div className='bg-primary absolute top-[5px] right-[5px] rounded-full flex justify-center items-center w-10 h-10 p-2'>
                        <BiSearchAlt className='text-2xl text-white' />
                    </div>
                </div>
                <h3><span className='font-semibold text-black/80'> Popular Search: </span><span className='text-purple-500'>#</span> travel <span className='text-blue-400'>#</span> tech <span className='text-green-500'>#</span> Gadget</h3>
            </div>
        </div>
    );
};

export default Nav;