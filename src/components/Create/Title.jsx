import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiSparkles } from 'react-icons/hi2';
import SparkAnimating from './sparkAnimating';
import Spark from './Spark';

const Title = ({ blogData, setBlogData }) => {
    const [response, setResponse] = useState("");
    const [finalTitle, setFinalTitle] = useState("")
    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setBlogData(prev => ({
            ...prev,
            title: e.target.value
        }));
    };

    const handleGenerateTitle = async () => {
        setLoading(true); // Start loading
        const OPENROUTER_API_KEY = "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";
        const messages = [{ role: "user", content: `Create a blog title don,t include ${finalTitle}` }];

        try {
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: 'deepseek/deepseek-chat-v3-0324:free',
                    messages
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const aiMessage = response.data.choices[0].message;
            setResponse(aiMessage);
        } catch (error) {
            console.error('OpenRouter API error:', error.response?.data || error.message);
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    useEffect(() => {
        if (response?.content && typeof response?.content === 'string') {
            const regex = /(?<=\*\*")[^"]+(?="\*\*)/g;
            const matches = response?.content.match(regex);

            if (matches) {
                setBlogData(prev => ({
                    ...prev,
                    title: matches?.[0]
                }));
                setFinalTitle(matches?.[0])
            }
        }
    }, [response]);

    return (
        <div className="my-20">
            <h1 className="text-3xl font-semibold">
                What's your blog title?
            </h1>

            <div className="flex items-center justify-between my-5 border-b w-full p-2 text-2xl font-medium">
                <input
                    type="text"
                    placeholder="Building the Future: Coding My Way Through Innovation"
                    value={blogData?.title || ""}
                    className="w-full focus:outline-0"
                    onChange={handleChange}
                />

                <div className="group relative flex h-fit cursor-pointer justify-center">
                    <div
                    onClick={handleGenerateTitle}
                    >
                        {loading ? (
                            <SparkAnimating />
                        ) : (
                            <Spark handleGenerateTitle={handleGenerateTitle} />
                        )}
                    </div>

                    {/* Hover Text */}
                    {!loading && (
                        <div className="absolute -top-12 cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-top-16 group-hover:opacity-100">
                            <p className="h-fit rounded-md bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#9333EA] text-sm px-3 py-2 text-white shadow-[0px_0px_10px_0px_#6366F1]">
                                Generate with AI
                            </p>
                            <span className="absolute -bottom-2 left-[50%] h-0 w-0 -translate-x-1/2 rotate-[135deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#6366F1] shadow-[0px_0px_10px_0px_#6366F1]"></span>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading Effect */}
            {loading && (
                <p className="text-primary text-lg font-medium mt-3 animate-pulse">
                    Generating title...
                </p>
            )}
        </div>
    );
};

export default Title;




// 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