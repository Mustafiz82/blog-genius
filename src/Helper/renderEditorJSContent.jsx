"use client"
import { useEffect, useState } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
import "prismjs/themes/prism.css";
import "../style/unreset.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight,  gruvboxLight , materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism';


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
      style={materialLight}
      showLineNumbers
      wrapLines
      className="rounded-lg my-4"
    >
      {code}
    </SyntaxHighlighter>
  );
};




export const renderEditorJSContent = (content) => {
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
            className={`my-6 !font-bold ${
              block.data.level === 1 
                ? '!text-4xl !leading-tight' 
                : block.data.level === 2 
                ? '!text-3xl !leading-snug' 
                : block.data.level === 3 
                ? '!text-2xl !leading-normal' 
                : block.data.level === 4 
                ? '!text-xl !leading-relaxed' 
                : block.data.level === 5 
                ? '!text-lg !leading-loose' 
                : '!text-base !leading-loose'
            }`}
            dangerouslySetInnerHTML={{ __html: block.data.text }}
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
              className="my-6 border-l-4 border-primary bg-primary/10 text-black italic px-4 py-3 rounded-lg"
            >
              <p className="text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }} />
              {block.data.caption && (
                <footer className="mt-2 text-sm text-primary font-semibold">
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
              <table className="w-full border border-gray-200 rounded-sm overflow-hidden">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    {block.data.content[0]?.map((cell, idx) => (
                      <th 
                        key={`${blockKey}-th-${idx}`}
                        className="px-4 py-3 border-b bg-primary text-white border-white text-left font-semibold text-sm"
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
                          className="px-4 py-3 border-b border-black/50 text-gray-700 text-sm"
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