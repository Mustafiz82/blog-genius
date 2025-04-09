"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

// EditorJS tools
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Raw from "@editorjs/raw";

// Define tools
const EDITOR_TOOLS = {
  code: Code,
  header: { class: Header },
  paragraph: { class: Paragraph, inlineToolbar: true },
  checklist: CheckList,
  inlineCode: InlineCode,
  table: Table,
  list: List,
  quote: Quote,
  delimiter: Delimiter,
  raw: Raw,
  embed: Embed,
  image: SimpleImage,
};


function Editor({ data, onChange, holder, setBlogData, aiContent }) {
  const editorRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // New state to track the update process


  useEffect(() => {
    const initEditor = () => {
      if (!editorRef.current && document.getElementById(holder)) {
        const editor = new EditorJS({
          holder,
          placeholder: "Start writing here...",
          tools: EDITOR_TOOLS,
          data,
          async onChange(api) {
            const content = await api.saver.save();
            onChange(content);
            setBlogData((prev) => ({
              ...prev,
              blog: content,
            }));
          },
        });

        editorRef.current = editor;
        setEditorReady(true);
      }
    };

    const timeout = setTimeout(() => {
      initEditor();
    }, 100); // Delay to ensure DOM is ready

    return () => {
      clearTimeout(timeout);
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [holder]);

  // Update content when aiContent changes (optional)
  useEffect(() => {
    if (editorRef?.current && data && editorReady) {
      console.log(data);
      editorRef?.current?.render(data);
    }
  }, [aiContent]);

  return (
    <div>
      <div className="w-full max-w-full mx-auto">
        <div
          id={holder}
          className="bg-white text-black rounded-lg border border-gray-200 p-6 min-h-[500px] prose prose-lg"
        />
      </div>
    </div>
  );
}

export default Editor;
