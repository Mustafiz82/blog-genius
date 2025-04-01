import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiSparkles } from 'react-icons/hi2';
import SparkAnimating from './sparkAnimating';
import Spark from './Spark';
import { TbReload } from "react-icons/tb";


const Title = ({ blogData, setBlogData }) => {
    const [response, setResponse] = useState("");
    const [finalTitle, setFinalTitle] = useState("")
    const [loading, setLoading] = useState(false); // Loading state
    const [generatedTitleArray, setGeneratedTitleArray] = useState([])
    const [generatedTitleArrayIndex, setGeneratedTitleArrayIndex] = useState(0)

    const handleChange = (e) => {
        setBlogData(prev => ({
            ...prev,
            title: e.target.value
        }));
    };

    const handleGenerateTitle = async () => {
        const OPENROUTER_API_KEY = "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";
        const messages = [{ role: "user", content: `Create a blog title about ${blogData?.title || "any topic"} don,t include ${generatedTitleArray || ""}` }];


        setLoading(true);

        

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
                setGeneratedTitleArray(matches)
                console.log(matches);
                setBlogData(prev => ({
                    ...prev,
                    title: matches?.[0]
                }));

                setFinalTitle(matches?.[0])
            }
        }
    }, [response]);


    const handleChangeTitle = () => {
        console.log(generatedTitleArray?.length);
        console.log(generatedTitleArrayIndex);


        if ((generatedTitleArray.length > 0) && (generatedTitleArrayIndex < (generatedTitleArray?.length - 1))) {
            console.log(true);
            setBlogData(prev => ({
                ...prev,
                title: generatedTitleArray?.[generatedTitleArrayIndex + 1]
            }));
            setGeneratedTitleArrayIndex(prev => prev + 1)

            return
        }

        setGeneratedTitleArrayIndex(0)
    }

    return (
        <div className="my-20">
            <h1 className="text-xl lg:text-3xl font-semibold">
                What's your blog title?
            </h1>

            <div className="flex items-center justify-between my-5 border-b w-full p-2 text-lg lg:text-2xl font-medium">
                <input
                    type="text"
                    placeholder="Enter your blog title  or provide a topic name to generate a title"
                    value={blogData?.title || ""}
                    className="w-full bg-transparent line-clamp-1 focus:outline-0"
                    onChange={handleChange}
                />

                <div className='flex justify-center items-center gap-3'>

                    {
                        generatedTitleArray?.length > 0 && (generatedTitleArrayIndex !== generatedTitleArray?.length-1)  && <TbReload
                            onClick={handleChangeTitle}
                            className='!text-3xl cursor-pointer ' title='Change Title' />
                    }
                    <div className="group items-center gap-3 relative flex h-fit cursor-pointer justify-center">



                        <div className=''
                            onClick={handleGenerateTitle}
                        >
                            {loading ? (
                                <SparkAnimating />
                            ) : (
                                <Spark handleGenerateTitle={handleGenerateTitle} />
                            )}

                        </div>
                        {!loading && (
                            <div className="absolute -top-12 right-0 lg:right-auto cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-top-16 group-hover:opacity-100">
                                <p className="h-fit rounded-md bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#9333EA] text-sm px-3 py-2 text-white shadow-[0px_0px_10px_0px_#6366F1]">
                                    Generate with AI
                                </p>
                                <span className="absolute -bottom-2 left-[50%] h-0 w-0 -translate-x-1/2 rotate-[135deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#6366F1] shadow-[0px_0px_10px_0px_#6366F1]"></span>
                            </div>
                        )}

                        {/* Hover Text */}
                    </div>
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




