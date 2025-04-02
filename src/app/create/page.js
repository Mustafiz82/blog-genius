"use client";
import Blog from "@/components/Create/Blog";
import Details from "@/components/Create/Details";
import Publish from "@/components/Create/Publish";
import Step from "@/components/Create/Step";
import ThumbnailUploader from "@/components/Create/ThumbnailUploader";
import Title from "@/components/Create/Title";
import React, { useState, useEffect } from "react";
import "../../style/step.css"
import "../../style/spark.css"
import axios from "axios";
import blogService from "@/Service";
import Swal from "sweetalert2";
import { blogdetail } from "../Data/BlogData";

const Page = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false)

    const steps = [
        { id: 1, label: "Title" },
        { id: 2, label: "Blog" },
        { id: 3, label: "Thumbnail" },
        { id: 4, label: "Details" },
        { id: 5, label: "Publish" },

    ];

    // Default blog structure
    const Output = {
        id: null,
        title: "",
        blog: "",
        thumbnail: "",
        category: "",
        tags: [],
        authorName: ""
    };

    // State for blog data
    const [BlogData, setBlogData] = useState(Output);


    const handleNext = () => {
        if (currentStep === 0 && !BlogData.title.trim()) return;
        if (currentStep === 1 && !BlogData.blog.blocks) return;
        if (currentStep === 2 && !BlogData.thumbnail) return;
        if (currentStep === 3 && (!BlogData.category.trim() || BlogData.tags.length === 0 || !BlogData.authorName.trim())) return;

        const blogId = BlogData.id || `blog_${Date.now()}`;
        const updatedData = { ...BlogData, id: blogId };
        setBlogData(updatedData);

        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    // Handle Previous Step
    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };


    const handlePublishBlog = async () => {

        setLoading(true);
        const imageBBUrl = process.env.NEXT_PUBLIC_IMAGEBB_URL
        const file = BlogData.thumbnail

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const res = await axios.post(imageBBUrl, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });

                const imageUrl = res?.data.data.display_url;

                if (imageUrl) {
                    const object = {
                        ...BlogData,
                        thumbnail: imageUrl
                    }

                    const res = await blogService.postBlogs(object)
                    if (res?.data) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Your blog has been published successfully.',
                            icon: 'success',
                            confirmButtonText: 'Great!',
                            confirmButtonColor: '#8e67e6',
                            background: '#fff',
                            color: '#333'
                        });
                    }
                }

            } catch (err) {
                console.error("Error uploading image:", err);

                Swal.fire({
                    title: 'Oops!',
                    text: 'There was an error publishing your blog.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#8e67e6',
                    background: '#fff',
                    color: '#333'
                });
            } finally {
                setLoading(false);
            }
        }
    };


    // Disable Next Button if required fields are empty
    const isNextDisabled =
        (currentStep === 0 && !BlogData.title.trim()) ||
        (currentStep === 1 && !BlogData.blog.blocks) ||
        (currentStep === 2 && !BlogData.thumbnail) ||
        (currentStep === 3 && (!BlogData.category.trim() || BlogData.tags.length === 0 || !BlogData.authorName.trim()));

    return (
        <div className="min-h-screen px-5 pb-10 lg:max-w-[90%] xl:max-w-[70%] mx-auto">
            {/* Step Indicator */}
            <Step
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />

            {/* Dynamic Component Rendering */}
            {currentStep === 0 && (
                <Title blogData={BlogData} setBlogData={setBlogData} />
            )}

            <div style={{ display: currentStep === 1 ? "block" : "none" }}>
                <Blog
                    currentStep={currentStep}
                    blogData={BlogData}
                    setBlogData={setBlogData}
                />
            </div>

            {currentStep === 2 && (
                <ThumbnailUploader blogData={BlogData} setBlogData={setBlogData} />
            )}

            {currentStep === 3 && (
                <Details blogData={BlogData} setBlogData={setBlogData} />
            )}

            {currentStep === 4 && <Publish blogData={BlogData} />}

            {/* Navigation Buttons */}
            <div className="mt-10 space-x-3 flex justify-end">
                <button
                    className="px-4 py-2 bg-primary text-white rounded-sm"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                >
                    Prev
                </button>

                <button
                    className={`px-4 py-2 rounded-sm text-white ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
                        }`}
                    onClick={currentStep === 4 ? handlePublishBlog : handleNext}
                    disabled={isNextDisabled}
                >
                    {currentStep === 4
                        ? loading
                            ? "publishing ..."
                            : "Publish"
                        : "Next"}
                </button>
            </div>
        </div>

    );
};

export default Page;
