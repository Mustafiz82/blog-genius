"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "prismjs/themes/prism.css";
import "../../style/unreset.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language: initialLanguage }) => {
  const [language, setLanguage] = useState(initialLanguage || 'javascript');

  useEffect(() => {
    const detectLanguage = () => {
      if (!code) return 'javascript';
      if (/<\w+/.test(code)) return 'html';
      if (/function\s+\w+\s*\(|const\s+\w+\s*=|let\s+\w+\s*=/.test(code)) return 'javascript';
      if (/class\s+\w+|public\s+class/.test(code)) return 'java';
      if (/def\s+\w+|import\s+\w+/.test(code)) return 'python';
      if (/<\?php|\$[a-zA-Z_]/.test(code)) return 'php';
      return 'javascript';
    };

    setLanguage(detectLanguage());
  }, [code]);

  return (
    <SyntaxHighlighter 
      language={language} 
      style={oneLight}
      showLineNumbers
      wrapLines
      className="rounded-lg my-4"
    >
      {code}
    </SyntaxHighlighter>
  );
};

const renderEditorJSContent = (content) => {
  if (!content || !Array.isArray(content)) return null;

  return content.map((block, index) => {
    const blockKey = block.id || `block-${index}`;

    switch (block?.type) {
      case 'paragraph':
        return (
          <p 
            key={blockKey} 
            className="mb-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );

      case 'header':
        const HeaderTag = `h${Math.min(block.data.level, 6)}`;
        return (
          <HeaderTag 
            key={blockKey}
            className={`my-6 font-bold ${block.data.level === 1 ? 'text-3xl' : 'text-xl'}`}
            dangerouslySetInnerHTML={{ __html: block.data.text}}
          />
        );

      case 'list':
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag
            key={blockKey}
            className={`mb-4 pl-6 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}
          >
            {block.data.items.map((item, idx) => (
              <li 
                key={`${blockKey}-${idx}`}
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ListTag>
        );

      case 'quote':
        return (
          <blockquote
            key={blockKey}
            className="my-6 border-l-4 border-blue-400 bg-blue-50 text-blue-800 italic px-4 py-3 rounded-lg"
          >
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }} />
            {block.data.caption && (
              <footer className="mt-2 text-sm text-blue-600">
                — {block.data.caption}
              </footer>
            )}
          </blockquote>
        );

      case 'delimiter':
        return <hr key={blockKey} className="my-8 border-t-2 border-gray-200" />;

      case 'code':
        return <CodeBlock key={blockKey} code={block.data.code} language={block.data.language} />;

      case 'checklist':
        return (
          <ul key={blockKey} className="my-4 space-y-2">
            {block.data.items.map((item, idx) => (
              <li 
                key={`${blockKey}-${idx}`} 
                className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="h-5 w-5 text-blue-500"
                />
                <span 
                  className={`text-gray-800 ${item.checked ? 'line-through text-gray-500' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </li>
            ))}
          </ul>
        );

      case 'table':
        return (
          <div key={blockKey} className="my-6 overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  {block.data.content[0]?.map((cell, idx) => (
                    <th 
                      key={`${blockKey}-th-${idx}`}
                      className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-sm"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {block.data.content.slice(1)?.map((row, rowIdx) => (
                  <tr 
                    key={`${blockKey}-tr-${rowIdx}`} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.map((cell, cellIdx) => (
                      <td 
                        key={`${blockKey}-td-${rowIdx}-${cellIdx}`}
                        className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm"
                        dangerouslySetInnerHTML={{ __html: cell }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        console.warn(`Unhandled block type: ${block.type}`);
        return null;
    }
  });
};

export default function Publish({ blogData: blog }) {
  return (
    <div className='w-full bg-white/70 my-8 md:my-20 p-4 md:p-8 max-w-4xl mx-auto'>
      <div className="relative w-full aspect-video mb-8">
        <Image 
          src={URL.createObjectURL(blog.thumbnail)}
          alt={blog.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      
      <h1 className='mb-6 text-3xl md:text-4xl font-bold text-gray-900'>{blog?.title}</h1>
      
      <div className='prose max-w-none'>
        {renderEditorJSContent(blog?.blog?.blocks)}
      </div>

      {blog.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          Written by: <span className="font-semibold text-gray-800">{blog.authorName}</span>
        </p>
      </div>
    </div>
  );
}