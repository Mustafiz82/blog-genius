import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import SparkAnimating from "./sparkAnimating";
import Spark from "./Spark";

let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});

const Blog = ({ blogData, setBlogData }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aiContentState, setAiContentState] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const structure = {
    "id": "EBsNUECRPO",
    "type": "list",
    "data": {
        "style": "ordered",
        "meta": {
            "counterType": "numeric"
        },
        "items": [
            {
                "content": "d",
                "meta": {},
                "items": []
            }
        ]
    }
}
    const handleGenerateBlog = async () => {
        setLoading(true);
        setErrorMessage(""); // Reset error before generating new content

        const OPENROUTER_API_KEY = "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"; 
        const messages = [{
            role: "user", 
            content: `Generate a detailed blog with the title '${blogData?.title}' in Editor.js JSON format, maintaining bold, italic, underline, and other text formatting; use a code block only if the topic is directly related to programming or coding and also it needed to add as a quote in standard way, use quote blocks for direct sayings from people, and if a section is non-technical and a quote is appropriate, use a quote block; ensure the JSON includes the required 'time' and 'version' fields along with properly formatted 'blocks', and generate the content strictly in English. N.B list item structure : ` 
        }];

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
            if (aiContent) {
                console.log(aiContent);
                try {
                    const editorFormat = JSON.parse(aiContent.split("```json")?.[1]?.split("``")?.[0]);
                    console.log(editorFormat);

                    // Validate the JSON structure
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
                    setErrorMessage("Error Generating content. please try again . ");
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
                    <p className="text-primary mb-5 text-3xl font-medium animate-pulse">
                        Generating your blog...
                    </p>
                ) : (
                    <h1 className="mb-5 text-3xl font-semibold">
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
            />
        </div>
    );
};

export default Blog;
