import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import SparkAnimating from "./sparkAnimating";
import Spark from "./Spark";
import convertToEditorJSFormat from "@/Helper/convertToEditorJSFormat";

let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});

const Blog = ({ blogData, setBlogData  }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
        const [aiContentState ,  setAiContentState] = useState(false)
    

    const handleGenerateBlog = async () => {
        setLoading(true);

        const OPENROUTER_API_KEY = "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"; const messages = [{ role: "user", content: `Write a detailed blog on "${blogData?.title}"` }];

        try {
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "deepseek/deepseek-chat-v3-0324:free",
                    messages,
                },
                {
                    headers: {
                        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const aiContent = response.data.choices[0]?.message?.content;
            console.log(response.data.choices[0]?.message);
            if (aiContent) {
                setBlogData((prev) => ({
                    ...prev,
                    blog: convertToEditorJSFormat(aiContent)
                }));
                setContent(aiContent)
                setAiContentState(!aiContentState)

            }
        } catch (error) {
            console.error("OpenRouter API error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="py-5 px-5 my-16 mb-5 bg-white/70 rounded-lg">
            <div className="flex justify-between items-center">

                {loading ? (
                    <p className="text-primary mb-5 text-3xl font-medium animate-pulse">
                        Generating your blog...
                    </p>
                ) : <h1 className="mb-5 text-3xl font-semibold">Write description of your blog.</h1>}
                <div className="group relative flex h-fit cursor-pointer justify-center" onClick={handleGenerateBlog}>
                    {loading ? (
                        <SparkAnimating />
                    ) : (
                        <Spark />
                    )}
                </div>
            </div>

            <Editor data={blogData?.blog} aiContent={aiContentState} blogData={blogData} onChange={setContent} holder="editor_create" setBlogData={setBlogData} />
        </div>
    );
};

export default Blog;
