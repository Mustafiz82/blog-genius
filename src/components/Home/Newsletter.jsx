"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Newsletter({ blog }) {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        Swal.fire({
            title: 'Subscription Confirmed!',
            text: 'Thanks for subscribing to our newsletter. This is just a demo feature for design purposes and is not functional.',
            icon: 'success',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#8e67e6',
          });
          
    }
    return (
        <div className={`relative overflow-hidden   bg-white ${!blog && "shadow-lg"} rounded-lg py-14 px-5 lg:p-8 lg:py-12  ${blog ? "mx-0 text-center space-y-3" : "mx-5 lg:mx-10"} `}>
            {/* Title & Subtitle */}
            <h2 className="text-xl font-semibold text-gray-900">Subscribe Newsletter</h2>
            <p className="text-gray-600">Sign up for free and be the first to get notified about new posts.</p>

            {/* Subscription Form */}
            <div className={`${blog ? "flex-col space-y-2  gap-4" : "flex-col md:flex-row"} flex gap-3 lg:gap-0 items-center mt-4 space-x-2`}>
                <input
                    type="email"
                    placeholder="Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow w-full p-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleSubscribe}
                    className="flex items-center  gap-2 bg-primary text-white px-5 py-2 rounded-full shadow-lg hover:bg-black/70 transition-all"
                >
                    <FaPaperPlane size={16} /> Subscribe
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-[10px] left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400"></div>
            <div className="absolute  top-6 left-[200px] w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-6 right-20 w-4 h-4 bg-primary rounded-full"></div>
            <div className="absolute top-[50px] right-8 w-3 h-3 bg-yellow-400 rotate-45"></div>
        </div>
    );
}
