import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import SparkAnimating from "./sparkAnimating";
import Spark from "./Spark";
import { blogdetail } from "@/app/Data/BlogData";

let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});

const Blog = ({ blogData, setBlogData , currentStep }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aiContentState, setAiContentState] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleGenerateBlog = async () => {
        setLoading(true);
        setErrorMessage(""); // Reset error before generating new content
    
        const OPENROUTER_API_KEY = "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"; 
        const messages = [{
            role: "user", 
            content: `generate a detailed blog about topic '${blogData?.title}'. The blog format should be in Editor.js JSON format. Don't use image here. You can use <quote> if appropriate. Don't use any markdown (** or other). For formatting use <b>, <i>, or <u>. Example response: ${blogdetail?.blog}. please be extra careful in json structure cause one syntax error. dont make syntax error like "Expected ',' or ']' after array element in JSON at position " will crash my website as i am using api. Answer exactly in the same way. No format modification. Strictly follow it. Must include "version".`
        }];
    
        try {
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: 'google/gemini-2.0-flash-lite-001',
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
            if (aiContent) {
                console.log(aiContent);
                try {
                    const editorFormat2 = aiContent.split("```json")?.[1]?.split("```")?.[0];
                    const parsed = JSON.parse(editorFormat2);
    
                    // Ensure required fields
                    const editorFormat = {
                        ...parsed,
                        time: parsed.time || Date.now(),
                        version: parsed.version || "2.27.0"
                    };
    
                    // Validate Editor.js structure
                    if (
                        typeof editorFormat !== "object" ||
                        !editorFormat.time ||
                        !editorFormat.version ||
                        !Array.isArray(editorFormat.blocks)
                    ) {
                        throw new Error("Invalid Editor.js format.");
                    }
    
                    setBlogData((prev) => ({
                        ...prev,
                        blog: editorFormat
                    }));
                    setContent(aiContent);
                    setAiContentState(!aiContentState);
                } catch (parseError) {
                    console.error("Editor.js JSON Parsing Error:", parseError);
                    setErrorMessage("Error Generating content. Please try again.");
                }
            }
        } catch (error) {
            console.error("OpenRouter API error:", error.response?.data || error.message);
            setErrorMessage("Error: Failed to generate blog content. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
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
