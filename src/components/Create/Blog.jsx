import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import SparkAnimating from "./sparkAnimating";
import Spark from "./Spark";
import { blogdetail } from "@/app/Data/BlogData";
import { generateBlogPrompt } from "@/Helper/Promt";
import { generateBlogWithAi } from "@/Helper/generateBlogWithAi";

let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});

const Blog = ({ blogData, setBlogData, currentStep }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aiContentState, setAiContentState] = useState("false");
    const [errorMessage, setErrorMessage] = useState("");


    const handleGenerateBlog = () => {
        generateBlogWithAi(
            blogData,
            setBlogData,
            setContent,
            setAiContentState,
            setLoading,
            setErrorMessage
        )
    }


    return (
        <div className="py-5 shadow-sm px-5 my-16 mb-5 bg-white/50 rounded-lg">
            <div className="flex justify-between items-center">
                {loading ? (
                    <p className="text-primary lg:mb-5 text-xl lg:text-3xl font-medium animate-pulse">
                        Generating your blog...
                    </p>
                ) : (
                    <h1 className="lg:mb-5 text-xl lg:text-3xl font-semibold">
                        Write description of your blog.
                    </h1>
                )}
                <div className="group relative flex h-fit cursor-pointer justify-center" onClick={handleGenerateBlog}>
                    {loading ? <SparkAnimating /> : <Spark />}
                </div>
            </div>

            {errorMessage ? (
                <div className="p-4 bg-red-100 text-red-700 rounded-md mb-3">{errorMessage}</div>
            ) : null}

            <Editor
                data={errorMessage ? null : blogData?.blog}
                aiContent={aiContentState}
                blogData={blogData}
                onChange={setContent}
                holder="editor_create"
                setBlogData={setBlogData}
                currentStep={currentStep}
            />
        </div>
    );
};

export default Blog;


//136  line