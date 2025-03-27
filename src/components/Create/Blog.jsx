import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { HiSparkles } from "react-icons/hi2";
import SparkAnimating from "./sparkAnimating";
import Spark from "./Spark";

let Editor = dynamic(() => import("@/components/Create/Editor"), {
    ssr: false,
});

const Blog = ({ blogData, setBlogData }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

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

            if (aiContent) {
                setBlogData((prev) => ({
                    ...prev,
                    blog: markdownToEditorJS(aiContent)
                }));
                setContent(aiContent)




                //     console.log(aiContent);
                //    let  newContent =
                //     console.log(newContent);
                //     setContent(aiContent);
            }
        } catch (error) {
            console.error("OpenRouter API error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    function markdownToEditorJS(markdown) {
        const blocks = [];
        const lines = markdown.split("\n");
    
        let currentList = [];
    
        lines.forEach(line => {
            if (line.startsWith("# ")) {
                // Heading 1
                blocks.push({
                    type: "header",
                    data: {
                        text: `**${line.substring(2)}**`,
                        level: 1
                    }
                });
            } else if (line.startsWith("## ")) {
                // Heading 2
                blocks.push({
                    type: "header",
                    data: {
                        text: `**${line.substring(3)}**`,
                        level: 2
                    }
                });
            } else if (line.startsWith("### ")) {
                // Heading 3
                blocks.push({
                    type: "header",
                    data: {
                        text: line.substring(4),
                        level: 3
                    }
                });
            } else if (line.startsWith("- ") || line.startsWith("1. ")) {
                // List Item (unordered or ordered)
                if (currentList.length === 0) {
                    blocks.push({
                        type: "list",
                        data: {
                            style: line.startsWith("1.") ? "ordered" : "unordered",
                            items: []
                        }
                    });
                }
                blocks[blocks.length - 1].data.items.push(line.substring(2));
            } else if (line.trim() === "---") {
                // Horizontal Rule
                blocks.push({
                    type: "delimiter",
                    data: {}
                });
            } else if (line.startsWith("**") && line.endsWith("**")) {
                // Bold Text
                blocks.push({
                    type: "paragraph",
                    data: {
                        text: `**${line.substring(2, line.length - 2)}**`
                    }
                });
            } else if (line.startsWith("`") && line.endsWith("`")) {
                // Inline Code
                blocks.push({
                    type: "inline-code",
                    data: {
                        code: line.substring(1, line.length - 1)
                    }
                });
            } else if (line.startsWith("```")) {
                // Code Block
                const code = [];
                let i = lines.indexOf(line);
                while (i + 1 < lines.length && !lines[i + 1].startsWith("```")) {
                    code.push(lines[i + 1]);
                    i++;
                }
                blocks.push({
                    type: "code",
                    data: {
                        code: code.join("\n")
                    }
                });
            } else if (line.startsWith("> ")) {
                // Quote
                blocks.push({
                    type: "quote",
                    data: {
                        text: line.substring(2),
                        caption: ""
                    }
                });
            } else if (line.startsWith("![") && line.includes("](")) {
                // Image
                const url = line.match(/\((.*?)\)/)[1];
                const altText = line.match(/\[(.*?)\]/)[1];
                blocks.push({
                    type: "image",
                    data: {
                        file: {
                            url: url
                        },
                        caption: altText,
                        stretched: false,
                        withBorder: false,
                        withBackground: false
                    }
                });
            } else if (line.trim()) {
                // Paragraph (including text with bold)
                let formattedText = line;
                // Bold Text Handling (example: **bold**)
                formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '**$1**');
    
                blocks.push({
                    type: "paragraph",
                    data: {
                        text: formattedText
                    }
                });
            }
        });
    
        // Return the final structure with time
        return {
            time: new Date().toISOString(),
            blocks: blocks
        };
    }
    
    
    // const dummyData = {
    //     time: new Date().toISOString(), 
    //     blocks: [
    //         {
    //             type: "header",
    //             data: {
    //                 text: "**Exploring \"shfdshfds\": A Deep Dive into Its Meaning and Significance**",
    //                 level: 1,
    //             },
    //         },
    //         {
    //             type: "header",
    //             data: {
    //                 text: "**Introduction**",
    //                 level: 2,
    //             },
    //         },
    //         {
    //             type: "paragraph",
    //             data: {
    //                 text: "Have you ever come across the term **\"shfdshfds\"** and wondered what it means? At first glance, it appears to be a random string of letters, but could there be more to it? In this blog post, we’ll explore the possible origins, interpretations, and cultural significance of \"shfdshfds.\"",
    //             },
    //         },
           
    //     ]
    // }


    const dummyData = {
        "time": "2025-03-26T15:49:50.833Z",
        "blocks": [
            {
                "type": "header",
                "data": {
                    "text": "****The Letter \"D\": A Deep Dive into Its History, Usage, and Significance**  **",
                    "level": 1
                }
            },
            {
                "type": "header",
                "data": {
                    "text": "****Introduction**  **",
                    "level": 2
                }
            },
            
            {
                "type": "paragraph",
                "data": {
                    "text": "Would you like any additional sections or refinements? 😊"
                }
            }
        ]
    }
   
    



    return (
        <div className="py-5 px-5 my-16 mb-5 bg-white/50 rounded-lg">
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

            <Editor data={blogData?.blog} newData={dummyData} blogData={blogData} onChange={setContent}  holder="editor_create" setBlogData={setBlogData} />
        </div>
    );
};

export default Blog;
