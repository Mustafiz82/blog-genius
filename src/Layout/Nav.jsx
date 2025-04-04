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
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LuMenu } from "react-icons/lu";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(null)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const subcategories = ["technology", "travel", "lifestyle", "Food", "business"];

    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";
    const { data: session, status } = useSession();

    const handleLogout = () => {
        signOut();
        setUserDropdownOpen(false);
    };

    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {

        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
            setIsOpen(false)
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };





    return (
        <div hidden={isAuthPage} className="relative">
            <div className='py-4 shadow-sm flex justify-between items-center 2xl:text-lg bg-white px-5 w-full '>
                {/* Logo Section */}
                <div className='flex items-center gap-2'>
                    <LuMenu onClick={() => setDrawerOpen(!drawerOpen)} className='text-2xl cursor-pointer lg:hidden' />

                    <Link href={"/"}>
                        <h2 className='text-xl 2xl:text-2xl !font-semibold uppercase'>
                            <span className='text-primary'>Blog </span> Genius Ai
                        </h2>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className='hidden lg:flex justify-center'>
                    <ul className='flex font-light z-[999] gap-5 relative'>
                        <li>
                            <Link href="/blogs">Blogs</Link>
                        </li>
                        {subcategories.map((sub, idx) => (
                            <li onClick={() => setDate(new Date())} className='hover:text-primary duration-300' key={idx}>
                                <Link href={`/blogs/category/${sub} `} className="capitalize">
                                    {sub}
                                </Link>
                            </li>
                        ))}

                        <li className='text-red-500'>{date ? date.getTime() : null}</li>
                    </ul>
                </div>

                {/* Search and Login/Menu Section */}
                <div className='flex justify-end gap-2 md:gap-5 items-center'>
                    <CiSearch onClick={() => setIsOpen(true)} className='text-4xl md:text-3xl cursor-pointer' />
                    {status === "loading" ? (
                        <button className="px-4 md:px-8 py-3 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed">
                            Loading...
                        </button>
                    ) : session ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="md:hover:bg-black/70  duration-300 md:px-8 md:py-3 bg-transparent md:bg-primary text-white font-semibold rounded-md flex items-center gap-2"
                            >
                                <Image src={session?.user?.image} alt='profile' width={1000} height={1000} className='rounded-full w-8 h-8' />
                                <span className='hidden md:block'>  {session?.user?.name?.split(" ")[0]}</span>
                                <IoIosArrowDown className={`text-lg transition-transform hidden md:block duration-300 ${userDropdownOpen ? "rotate-180" : "rotate-0"}`} />
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
                            <button className="hover:bg-black/70 duration-300 px-4 md:px-8 py-3 bg-primary text-white font-semibold rounded-md">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setDrawerOpen(false)}
            ></div>

            <div
                className={`fixed z-[9999] top-0 left-0 h-full bg-white w-64 p-5 transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
            >
                <div className="flex justify-between items-center mb-8">
                    <Link href={"/"}>
                        <h2 className='text-2xl font-semibold'>
                            <span className='text-primary'>Blog </span> Genius Ai
                        </h2>
                    </Link>
                    <IoCloseOutline onClick={() => setDrawerOpen(false)} className="text-3xl cursor-pointer" />
                </div>
                <ul className='space-y-4'>
                    <li>
                        <Link href="/blogs" className="block">Blogs</Link>
                    </li>
                    {subcategories.map((sub, idx) => (
                        <li

                            key={idx}>

                            <Link

                                href={`/blogs/category/${sub}`} className="block capitalize">
                                {sub}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search Box */}
            <div className={`${isOpen ? "translate-y-0" : "-translate-y-full"} px-5 shadow-md lg:px-0 absolute flex z-[999] gap-4 flex-col duration-500 py-5 items-center top-0 w-full h-[300px] bg-white`}>
                <IoCloseOutline onClick={() => setIsOpen(false)} className="text-7xl leading-0 cursor-pointer" />
                <h2 className='text-xl font-semibold'>Type and hit Enter to search</h2>
                <div className="relative w-full lg:w-auto ">
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='border duration-200 border-gray-400 px-5 py-3 rounded-full focus:outline-0 focus:border-gray-600 w-full lg:w-[600px]' type="text" placeholder='Search blogs ...' />
                    <div
                        onClick={handleSearch}
                        className='bg-primary absolute top-[5px] right-[5px] rounded-full flex justify-center items-center w-10 h-10 p-2'>
                        <BiSearchAlt className='text-2xl text-white' />
                    </div>
                </div>
                <h3><span className='font-semibold text-black/80'> Popular Search: </span><span className='text-purple-500'>#</span> travel <span className='text-blue-400'>#</span> tech <span className='text-green-500'>#</span> Gadget</h3>
            </div>
        </div>
    );
};

export default Nav;
