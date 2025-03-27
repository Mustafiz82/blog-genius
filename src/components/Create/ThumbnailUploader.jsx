import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function ThumbnailUploader({ blogData, setBlogData }) {
    const [image, setImage] = useState(blogData?.thumbnail || "");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const handlePaste = (event) => {
            const clipboardItems = event.clipboardData.items;
            for (let item of clipboardItems) {
                if (item.type.startsWith("image")) {
                    const file = item.getAsFile();
                    previewImage(file);
                    setBlogData(prev => ({
                        ...prev,
                        thumbnail: file
                    }));
                    break;
                }
            }
        };

        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            previewImage(file);
            setBlogData(prev => ({
                ...prev,
                thumbnail: file
            }));

        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            previewImage(file);
            setBlogData(prev => ({
                ...prev,
                thumbnail: file
            }));
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex justify-between gap-10 mt-20  my-10">

            <div className="flex-1 max-w-[400px]">
                <h1 className="text-2xl font-semibold">Upload Your Thumbnail</h1>
                <p className=" text-sm 2xl:text-base my-2">Easily upload your thumbnail by dragging and dropping an image, selecting a file from your device, pasting an image . For best results, please upload an image in 16:9 format (e.g., 1920x1080, 1280x720).</p>

                <button className="px-6 py-2 mt-4 text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-md shadow-md transition-all">
                    ✨ Generate with AI
                </button>


            </div>
            <div
                className="border-2 h-[300px] aspect-video  flex justify-center items-center border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-white/30 duration-300"
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {image ? (
                    <img src={URL.createObjectURL(blogData.thumbnail)} alt="Thumbnail" className="h-full w-auto rounded-lg" />
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <Image alt="thumbnail" src={"/images/image-icon.png"}
                            className="w-[100px] h-[100px] object-cover opacity-65"
                            width={500} height={500} />
                        <p className="text-gray-500">Click, drag & drop, or paste an image here</p>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>
        </div>
    );
}
