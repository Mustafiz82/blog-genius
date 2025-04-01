import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
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

const EDITOR_TOOLS = {
    code: Code,
    header: {
        class: Header,
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    checklist: CheckList,
    inlineCode: InlineCode,
    table: Table,
    list: List,
    quote: Quote,
    delimiter: Delimiter,
    raw: Raw,
};

function Editor({ data, onChange, holder, setBlogData , aiContent , currentStep}) {
    // Reference to the editor instance
    const ref = useRef(null);

    useEffect(() => {
        // Initialize the editor if it's not initialized yet
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                placeholder: "Start writing here..",
                tools: EDITOR_TOOLS,
                data, // Initial data passed
                async onChange(api, event) {
                    const content = await api.saver.save();
                    onChange(content);
                    setBlogData((prev) => ({
                        ...prev,
                        blog: content,
                    }));
                },
            });
            ref.current = editor;
        }

        // Clean up on unmount
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, [holder]); // Run only when the holder changes or data changes

    useEffect(() => {   
        if (data) {
            // Re-render the editor with the new data
            ref.current?.render(data);
        }
    }, [aiContent]); // Re-render the editor when the data prop changes

    return (
        <div>
            <div className="w-full max-w-full mx-auto">
                <div  id={holder} className="bg-white text-black rounded-lg border border-gray-200 p-6 min-h-[500px] prose prose-lg" />
            </div>
        </div>
    );
}


export default Editor;
