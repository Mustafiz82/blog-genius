"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "prismjs/themes/prism.css"; // Light mode PrismJS theme
import "../../style/unreset.css"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight , duotoneLight , solarizedlight , base16AteliersulphurpoolLight} from 'react-syntax-highlighter/dist/esm/styles/prism';

// import { detect } from 'lang-detector';


const renderEditorJSContent = (content) => {


    return content?.map((block) => {
        switch (block?.type) {
            case 'paragraph':
                return <p key={block.id}>{block.data.text}</p>;

            case 'header':
                const HeaderTag = `h${block.data.level}`; // Dynamically create h1, h2, h3, etc.
                return <HeaderTag key={block.id}>{block.data.text}</HeaderTag>;

            case 'list':
                if (block.data.style === 'unordered') {
                    return (
                        <ul className='list-disc pl-6 ' key={block.id}>
                            {block?.data?.items?.map((item, idx) => (
                                <li key={idx}>{item.content}</li>
                            ))}
                        </ul>
                    );
                } else {
                    return (
                        <ol className='list-decimal pl-6' key={block.id}>
                            {block.data.items.map((item, idx) => (
                                <li key={idx}>{item.content}</li>
                            ))}
                        </ol>
                    );
                }

            case 'quote':
                return (
                    <blockquote
                        key={block.id}
                        className="border-l-4 border-gray-400 bg-gray-50 text-gray-800 italic px-4 py-3 rounded-lg shadow-sm"
                    >
                        <p className="text-lg">{block.data.text}</p>
                        <footer className="mt-2 text-sm text-gray-600">— {block.data.caption}</footer>
                    </blockquote>

                );

            case 'delimiter':
                return <hr key={block.id} />;

            case 'code':
                const [language, setLanguage] = useState('javascript'); // Default language

                useEffect(() => {
                    // Example of very basic language detection (based on code patterns)
                    const code = block.data.code;

                    // Basic regex for detecting languages (you can expand this)
                    if (/function\s+\w+\s*\(/.test(code)) {
                        setLanguage('javascript');  // Looks like JavaScript
                    } else if (/class\s+\w+/.test(code)) {
                        setLanguage('java');  // Looks like Java (class declaration)
                    } else if (/^\s*#/.test(code)) {
                        setLanguage('python');  // Looks like Python (using "#")
                    } else if (/^\s*public\s+class/.test(code)) {
                        setLanguage('java');  // Looks like Java (public class)
                    } else {
                        setLanguage('javascript'); // Fallback to JavaScript
                    }
                }, [block.data.code]);

                return (
                    <SyntaxHighlighter language={language} style={duotoneLight}>
                        {block.data.code}
                    </SyntaxHighlighter>


                );

            case 'checklist':
                return (
                    <ul key={block.id} className="space-y-2">
                        {block.data.items.map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg shadow-sm border border-gray-300">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    readOnly
                                    className="h-5 w-5 text-blue-500 accent-blue-500 cursor-pointer"
                                />
                                <span className={`text-gray-800 ${item.checked ? " text-gray-500" : ""}`}>
                                    {item.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                );

            case 'table':
                return (
                    <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                {block.data.content[0].map((cell, idx) => (
                                    <th key={idx} className="px-4 py-2 border-b border-gray-300 text-left font-semibold">
                                        {cell}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {block.data.content.slice(1).map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition">
                                    {row.map((cell, idx) => (
                                        <td key={idx} className="px-4 py-2 border-b border-gray-200 text-gray-700">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                );

            default:
                return null;
        }
    });
};

export default function Publish({ blogData: blog }) {

    console.log(blog);
    return (
        <div className='w-full bg-white/70 my-20 p-5 '>
            <Image src={URL.createObjectURL(blog.thumbnail)} width={1000} height={1000} className='w-full h-[400px]' />
            <h1 className='my-5 !text-3xl '>{blog?.title}</h1>
            <div className='space-y-5'>{renderEditorJSContent(blog?.blog?.blocks)}</div>
        </div>
    );
}
