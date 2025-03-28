import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { HiSparkles } from "react-icons/hi2";
import SparkAnimating from "./sparkAnimating";
import Spark from "./Spark";
import EditorJSMarkdownConverter from "@vingeray/editorjs-markdown-converter";

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
            console.log(response.data.choices[0]?.message);
            if (aiContent) {
                setBlogData((prev) => ({
                    ...prev,
                    blog: convertToEditorJSFormat(aiContent)
                }));
                setContent(aiContent)

            }
        } catch (error) {
            console.error("OpenRouter API error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };



    function convertToEditorJSFormat(content) {
        const blocks = [];
        const lines = content.split('\n').filter(line => line.trim() !== '');
        let currentList = [];
        let currentParagraph = [];
        let currentTable = null;
        let inCodeBlock = false;
        let currentCode = null;

        const cleanText = (text) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')  // Bold
                .replace(/\*(?!\*)(.*?)(?<!\*)\*/g, '<i>$1</i>')  // Italic
                .replace(/`(.*?)`/g, '<code>$1</code>')  // Inline code
                .replace(/\*\*\*/g, '')                 // Remove standalone ***
                .replace(/\*\*/g, '')                   // Remove residual **
                .replace(/\*/g, '')                     // Remove residual *
                .trim();
        };

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                blocks.push({
                    type: 'paragraph',
                    data: { text: cleanText(currentParagraph.join('<br>')) }
                });
                currentParagraph = [];
            }
        };

        const flushList = () => {
            if (currentList.length > 0) {
                blocks.push({
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: currentList.map(item => cleanText(item))
                    }
                });
                currentList = [];
            }
        };

        const flushTable = () => {
            if (currentTable && currentTable.rows.length > 0) {
                blocks.push({
                    type: 'table',
                    data: {
                        withHeadings: true,
                        content: currentTable.rows
                    }
                });
                currentTable = null;
            }
        };

        lines.forEach(line => {
            // Handle code blocks
            if (inCodeBlock) {
                if (line.trim().startsWith('```')) {
                    blocks.push({
                        type: 'code',
                        data: {
                            code: currentCode.content.join('\n'),
                            language: currentCode.language
                        }
                    });
                    inCodeBlock = false;
                    currentCode = null;
                } else {
                    currentCode.content.push(line);
                }
                return;
            }

            const codeBlockStart = line.match(/^```(\w*)/);
            if (codeBlockStart) {
                inCodeBlock = true;
                currentCode = {
                    language: codeBlockStart[1] || '',
                    content: []
                };
                return;
            }

            // Handle tables
            if (line.trim().startsWith('|')) {
                if (!currentTable) currentTable = { rows: [] };

                const cells = line.split('|')
                    .map(cell => cell.trim())
                    .filter(cell => cell !== '');

                if (cells.every(cell => /^-+$/.test(cell))) return;

                currentTable.rows.push(cells.map(cell => cleanText(cell)));
                return;
            } else if (currentTable) {
                flushTable();
            }

            // Handle headers
            const headerMatch = line.match(/^(#+)\s(.*)/);
            if (headerMatch) {
                flushParagraph();
                flushList();
                blocks.push({
                    type: 'header',
                    data: {
                        text: cleanText(headerMatch[2]),
                        level: Math.min(headerMatch[1].length, 6)
                    }
                });
                return;
            }

            // Handle horizontal rules
            const trimmedLine = line.trim();
            const hrContent = trimmedLine.replace(/\s+/g, '');
            if (/^[-*_]{3,}$/.test(hrContent)) {
                flushParagraph();
                flushList();
                blocks.push({ type: 'delimiter', data: {} });
                return;
            }

            // Handle list items
            if (line.startsWith('- ')) {
                flushParagraph();
                currentList.push(line.replace(/^- /, ''));
                return;
            }

            // Handle empty lines
            if (trimmedLine === '') {
                flushParagraph();
                flushList();
                return;
            }

            // Handle regular text
            currentParagraph.push(line);
        });

        // Final flushes
        flushParagraph();
        flushList();
        flushTable();

        return {
            time: Date.now(),
            blocks,
            version: '2.25.0'
        };
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

            <Editor data={blogData?.blog} newData={dummyData} blogData={blogData} onChange={setContent} holder="editor_create" setBlogData={setBlogData} />
        </div>
    );
};

export default Blog;
