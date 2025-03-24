import React, { useEffect, useRef, useState } from "react";
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
        shortcut: "CMD+H",
        inlineToolbar: true,
        config: {
            placeholder: "Enter a Header",
            levels: [2, 3, 4],
            defaultLevel: 2,
        },
    },
    paragraph: {
        class: Paragraph,
        // shortcut: 'CMD+P',
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
function Editor({ data, onChange, holder , setBlogData }) {
    //add a reference to editor
    const ref = useRef();
    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                placeholder: "Start writting here..",
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const content = await api.saver.save();
                    console.log("Editor Data:", content);
                    onChange(content);
                    setBlogData(prev => ({
                        ...prev,
                        blog: content
                    }));
                   
                },
            });
            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <div className="">
                <div className="w-full max-w-full mx-auto">
                    <div
                        id={holder}
                        className="bg-white  text-black  rounded-lg border border-gray-200 p-6 min-h-[500px] prose prose-lg   "
                    />
                </div>
               

            </div>
        </>
    );
}

export default Editor;