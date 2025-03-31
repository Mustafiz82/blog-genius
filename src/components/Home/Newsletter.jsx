"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Newsletter({ blog }) {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        alert(`Subscribed with ${email}`);
    };

    return (
        <div className={`relative overflow-hidden my-10 bg-white ${!blog && "shadow-lg"} rounded-lg py-14 p-8  ${blog ? "mx-0 text-center space-y-3" : "mx-10"} `}>
            {/* Title & Subtitle */}
            <h2 className="text-xl font-semibold text-gray-900">Subscribe Newsletter</h2>
            <p className="text-gray-600">Sign up for free and be the first to get notified about new posts.</p>

            {/* Subscription Form */}
            <div className={`${blog ? "flex-col gap-4" : "flex-row"} flex items-center mt-4 space-x-2`}>
                <input
                    type="email"
                    placeholder="Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleSubscribe}
                    className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-pink-600 transition-all"
                >
                    <FaPaperPlane size={16} /> Subscribe
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-[10px] left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400"></div>
            <div className="absolute  top-6 left-[200px] w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-6 right-20 w-4 h-4 bg-pink-500 rounded-full"></div>
            <div className="absolute top-[50px] right-8 w-3 h-3 bg-yellow-400 rotate-45"></div>
        </div>
    );
}
