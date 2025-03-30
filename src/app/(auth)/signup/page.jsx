"use client"
import Input from '@/components/common/Input';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const page = () => {

    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    // Handle "Agree to Terms" checkbox (Only for Registration)
    const handleTermsChange = () => {
        setAgreeToTerms(!agreeToTerms);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!agreeToTerms) {
            setError("You must agree to the terms and conditions to proceed.");
            return;
        }

        setError(""); // Clear errors if no issues
        console.log(formData);
    };



    return (
        <div className="flex  md:min-h-screen py-10 bg-white md:bg-transparent md:py-0  2xl:py-16 items-center justify-center ">
            <div className="w-full bg-white box-content p-8 md:shadow-lg  max-w-md space-y-8 rounded-sm">
                <div className="text-center">
                    <h1 className="text-3xl   font-bold font-inter tracking-tight">
                        Publish Your                      <br />
                        Blog with AI
                    </h1>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 mt-14 gap-4">
                    <button
                        type="button"
                        className="w-full  duration-300 white-btn flex rounded-full items-center justify-center px-4 py-2 border-gray-300 shadow-sm border text-sm font-medium text-gray-700   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 hover:border-primary hover:text-white hover:bg-primary group active:scale-100"
                    >
                        <span className="w-5 h-5 mr-2 transition-all duration-300 ">
                            <FcGoogle className="w-full h-full group-hover:brightness-0 group-hover:invert duration-300" />
                        </span>
                       signup with Google
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-2 border-gray-300 rounded-full shadow-sm border text-sm font-medium text-gray-700 group  hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 hover:border-primary cursor-pointer  duration-300 active:scale-100"
                    >
                        <FaFacebookF className="w-5 h-5 mr-2 text-[#1877F2]  group-hover:!text-white duration-300" />
                       signup with Facebook
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="pt-5 space-y-6">

                    <div className="space-y-2 w-full ">
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            id="name_input"
                            value={formData?.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2 w-full ">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            id="email_input"
                            value={formData?.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            id="password_input"
                            value={formData?.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        {/* Show "Agree to Terms" only for Registration */}
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                id="termsAndConditions"
                                className="w-4 h-4 border border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                                checked={agreeToTerms}
                                onChange={handleTermsChange}
                            />
                            <label
                                htmlFor="termsAndConditions"
                                className={`ml-2 text-sm  ${error ? "text-red-500" : "text-gray-700"}`}
                            >
                                I agree with terms and conditions
                            </label>
                        </div>


                        <button className='hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md'>
                            Sign up
                        </button>
                    </div>
                </form>


                {/* Display error message */}

                <p className="text-center text-sm text-gray-600">
                    Already have an account?
                    <Link
                        href="/login"
                        // onClick={handlePageChange}
                        className="font-semibold pl-2 hover:text-primary duration-300 text-gray-900 hover:underline"
                    >
                        LOG IN
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default page;