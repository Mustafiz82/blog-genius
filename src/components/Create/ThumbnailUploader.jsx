import Image from "next/image";
import { useState, useRef, useEffect } from "react";


export default function ThumbnailUploader({ blogData, setBlogData }) {
    const [image, setImage] = useState(blogData?.thumbnail || "");
    const [loading, setLoading] = useState(false);

    const replicateKey = "r8_23OCuvl8Xs33vrUK1tAtUZFcHet1jzh42I7lK"
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
        console.log(file);
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


    // apikey = eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMTgzODA0NzM5MTE1MjQ2MDUyOCIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkwMDk0OTI3NywidXVpZCI6IjM4NzExMDE4LTMwY2UtNDhkYS04OGVjLTNiYTVkMjU4MTk2OSIsIm5hbWUiOiJtdXN0YWZpeiIsImV4cGlyZXNfYXQiOiIyMDMwLTAzLTI4VDE3OjI3OjU3KzAwMDAifQ.3GuWEKUnsQsprw4ZV6qFw7o_s0Uzh2UFmjMdpCohvII


    // const generateImage = async () => {
    //     setLoading(true);

    //     const token = "flp_Fkj3n8PMY24bS5RPFeyaZi3EY9rjHhAYGlRAegYOgrYQb0"

    //     const headers = {
    //         "Authorization": "Bearer " + token,
    //         "Content-Type": "application/json",
    //       }

    //       const body = {
    //         "model": "mjywibjqlss5",
    //         "prompt": "Photograph light trails created by sparklers against a night sky. Use a DSLR camera with a 35mm lens, set to f/22 and a long exposure of 10 seconds. The scene is illuminated by the light trails, creating intricate patterns against a starry backdrop.",
    //         "response_format": "jpeg",
    //         "seed": 85935,
    //         "num_inference_steps": 36,
    //         "guidance_scale": 3.5
    //       }



    //       fetch("https://api.friendli.ai/dedicated/v1/images/generations", {
    //         method: "POST",
    //         headers,
    //         body: JSON.stringify(body)
    //       }).then(response => response.text())
    //         .then(response => {
    //             console.log(response);
    //         //     const file = new File([response], "generated-image.jpg", { type: "image/jpeg" });
    //         //    console.log(file);


    //         })
    //         .catch(err => console.log(err));



    //     setLoading(false);
    // };
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between gap-10 mt-20  my-10">

                <div className="flex-1 max-w-[400px]">
                    <h1 className="text-2xl font-semibold">Upload Your Thumbnail</h1>
                    <p className=" text-sm 2xl:text-base my-2">Easily upload your thumbnail by dragging and dropping an image, selecting a file from your device, pasting an image . </p>
                    <p className="mt-2 text-sm 2xl:text-base my-2   "> For best results, please upload an image in 16:9 format (e.g., 1920x1080, 1280x720).</p>

                    {/* <button
                        // onClick={handleGenerateWithAi}
                        className="px-6 py-2 mt-4 text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-md shadow-md transition-all">
                        ✨ Generate with AI 
                    </button> */}


                </div>
                <div
                    className="border-2 h-[300px] aspect-video  flex justify-center items-center border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-white/70 bg-white/50 duration-300"
                    onClick={() => fileInputRef.current.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {image ? (
                        typeof blogData.thumbnail === "string" ? (
                            <img src={blogData.thumbnail} alt="Thumbnail" className="h-full w-full rounded-lg object-cover" />
                        ) : (
                            <img src={URL.createObjectURL(blogData.thumbnail)} alt="Thumbnail" className="h-full w-full rounded-lg object-cover" />
                        )
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <Image alt="thumbnail" src={"/images/image-icon.png"}
                                className="w-[100px] h-[100px] object-cover opacity-80"
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


        </>
    );
}
