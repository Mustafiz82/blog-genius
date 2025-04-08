import { generateImageWithAI } from "@/Helper/generateImageWithAI";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";


export default function ThumbnailUploader({ blogData, setBlogData }) {

    const [image, setImage] = useState(blogData?.thumbnail || "");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(2)


    // handles directly copied image paste
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


    // Handle file select from device
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            previewImage(file);
            setBlogData(prev => ({
                ...prev,
                thumbnail: file
            }));

        }
    };


    //handles files drag and drop
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


    // Generate image with ai 
    const handleGenerate = () => {
        generateImageWithAI({
            title: blogData?.title,
            setLoading,
            setImage,
            setBlogData,
            setSelectedIndex,
            loading
        });
    };

    const loadingText = [
        "Analyzing Blog...", "Generating Image Prompt...", "Generating Image...", "Still working on it...", "Polishing the pixels...", "Almost there, hang tight!"
    ]


    return (

        <div className="flex flex-col md:flex-row justify-between gap-10 mt-20  my-10">

            <div className="flex-1 max-w-[400px]">
                <h1 className="text-2xl font-semibold">Upload Your Thumbnail</h1>
                <p className=" text-sm 2xl:text-base my-2">Easily upload your thumbnail by dragging and dropping an image, selecting a file from your device, pasting an image . </p>
                <p className="mt-2 text-sm 2xl:text-base my-2   "> For best results, please upload an image in 16:9 format (e.g., 1920x1080, 1280x720).</p>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-6 py-3 mt-4 text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-sm shadow-md transition-all">
                    ✨ Generate with AI
                </button>


            </div>
            <div
                className="border-2 relative h-[300px] aspect-video  flex justify-center items-center border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-white/70 bg-white/50 duration-300"
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />


                {
                    loading ? <div className="absolute animate-pulse top-0 left-0 flex items-center gap-2 justify-center bg-gray-200  bottom-0 right-0">
                        <div className="relative">
                            <Image alt="thumbnail" src={"/images/image-icon.png"}
                                className="w-[20px] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 h-[20px] object-cover opacity-50 "
                                width={500} height={500} />
                            <Image alt="spin" src={"/images/spin.png"}
                                className="w-[50px]    animate-spin  h-[50px] object-cover opacity-50 "
                                width={500} height={500} />
                        </div>
                        <div className="h-7 overflow-hidden">
                            {loadingText?.map((item, idx) => {
                                // Map selectedIndex to translation value
                                const translationValues = [
                                    'translate-y-0',
                                    '-translate-y-6',
                                    '-translate-y-12',
                                    '-translate-y-[72px]',
                                    '-translate-y-24',
                                    '-translate-y-[120px]'
                                ];

                                const translateClass = translationValues[selectedIndex] || 'translate-y-0';

                                return (
                                    <p key={idx} className={`text-left duration-300 ${translateClass}`}>
                                        {item}
                                    </p>
                                );
                            })}
                        </div>

                    </div> : image && !loading ? (
                        typeof blogData.thumbnail === "string" ? (
                            <img src={blogData.thumbnail} alt="Thumbnail" className="h-full w-full rounded-lg object-cover" />
                        ) : (
                            <img src={URL.createObjectURL(blogData.thumbnail)} alt="Thumbnail" className="h-full w-full rounded-lg object-cover" />
                        )
                    ) : (
                        <div hidden={loading == false} className="flex flex-col justify-center items-center">
                            <Image alt="thumbnail" src={"/images/image-icon.png"}
                                className="w-[100px] h-[100px] object-cover opacity-80"
                                width={500} height={500} />
                            <p className="text-gray-500">Click, drag & drop, or paste an image here</p>
                        </div>
                    )

                }
            </div>
        </div>


    );
}

