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
import { useSession, signOut } from 'next-auth/react';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const subcategories = ["technology", "travel", "lifestyle", "culture", "business"];

    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup"
    const { data: session, status } = useSession()

    const handleLogout = () => {
        signOut();
        setUserDropdownOpen(false);
    };

    return (
        <div hidden={isAuthPage} className="relative">
            <div className='py-4 shadow-sm flex justify-between items-center 2xl:text-lg bg-white px-5 w-full grid grid-cols-3'>
                {/* Logo Section */}
                <Link href={"/"}>
                    <h2 className='!text-2xl !font-semibold uppercase'>
                        <span className='text-primary'>Blog </span> Genius Ai
                    </h2>
                </Link>

                {/* Navigation Links */}
                <div className='flex justify-center'>
                    <ul className='flex font-light z-[999] gap-5 relative'>
                        <li>
                            <Link href="/blogs">Blogs</Link>
                        </li>
                        {subcategories.map((sub, idx) => (
                            <li className='hover:text-primary duration-300' key={idx}>
                                <Link href={`/blogs/category/${sub}`} className="capitalize">
                                    {sub}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Search and Login/Menu Section */}
                <div className='flex justify-end gap-5 items-center'>
                    <CiSearch onClick={() => setIsOpen(true)} className='text-3xl cursor-pointer' />
                    {status === "loading" ? (
                        <button className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed">
                            Loading...
                        </button>
                    ) : session ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md flex items-center gap-2"
                            >
                                <Image src={session?.user?.image} alt='profile' width={1000} height={1000} className='rounded-full w-8 h-8' />
                                {session?.user?.name?.split(" ")[0]}
                                <IoIosArrowDown className={`text-lg transition-transform duration-300 ${userDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>
                            {userDropdownOpen && (
                                <ul className="absolute z-[999] right-0 mt-2 bg-white shadow-md rounded-md p-2 w-48 transition-all duration-300">
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        <Link href="/create">Write Blog</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        <Link href="/my-blogs">My Blogs</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        <Link href="/drafts">Drafts</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link href={"/login"}>
                            <button className="hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md">
                                Login
                            </button>
                        </Link>
                    )}
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