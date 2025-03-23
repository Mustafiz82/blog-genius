"use client";
import Blog from "@/components/Create/Blog";
import Details from "@/components/Create/Details";
import Step from "@/components/Create/Step";
import ThumbnailUploader from "@/components/Create/ThumbnailUploader";
import Title from "@/components/Create/Title";
import React, { useState, useEffect } from "react";

const Page = () => {
    const [currentStep, setCurrentStep] = useState(0);

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
    const [drafts, setDrafts] = useState([]);

    // Load existing drafts from localStorage
    useEffect(() => {
        const storedDrafts = Object.keys(localStorage)
            .filter((key) => key.startsWith("blog_"))
            .map((key) => JSON.parse(localStorage.getItem(key)));

        setDrafts(storedDrafts);
    }, []);

    // Save draft to localStorage
    const saveDraft = (data) => {
        const draftId = data.id || `blog_${Date.now()}`;
        const updatedData = { ...data, id: draftId };

        localStorage.setItem(draftId, JSON.stringify(updatedData));
        setBlogData(updatedData);

        // Refresh drafts list
        setDrafts((prevDrafts) => {
            const existingDraftIndex = prevDrafts.findIndex((draft) => draft.id === draftId);
            if (existingDraftIndex !== -1) {
                const updatedDrafts = [...prevDrafts];
                updatedDrafts[existingDraftIndex] = updatedData;
                return updatedDrafts;
            }
            return [...prevDrafts, updatedData];
        });
    };

    // Handle Next Step with Validation and Draft Saving
    const handleNext = () => {
        if (currentStep === 0 && !BlogData.title.trim()) return;
        if (currentStep === 1 && !BlogData.blog.blocks) return;
        if (currentStep === 2 && !BlogData.thumbnail.trim()) return;
        if (currentStep === 3 && (!BlogData.category.trim() || BlogData.tags.length === 0 || !BlogData.authorName.trim())) return;

        saveDraft(BlogData);

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

    // Load selected draft
    const loadDraft = (draft) => {
        setBlogData(draft);
        setCurrentStep(0);
    };

    console.log(BlogData);

    // Disable Next Button if required fields are empty
    const isNextDisabled =
        (currentStep === 0 && !BlogData.title.trim()) ||
        (currentStep === 1 && !BlogData.blog.blocks) ||
        (currentStep === 2 && !BlogData.thumbnail.trim()) ||
        (currentStep === 3 && (!BlogData.category.trim() || BlogData.tags.length === 0 || !BlogData.authorName.trim()));

    return (
        <div className="min-h-screen pb-10 max-w-[70%] mx-auto">
            {/* Step Indicator */}
            <Step steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />

            {/* Dynamic Component Rendering */}
            {currentStep === 0 && <Title setBlogData={setBlogData} />}
            {currentStep === 1 && <Blog setBlogData={setBlogData} />}
            {currentStep === 2 && <ThumbnailUploader setBlogData={setBlogData} />}
            {currentStep === 3 && <Details setBlogData={setBlogData} />}

            
            {/* Navigation Buttons */}
            <div className="mt-10 space-x-3 flex justify-end">
                <button className="px-4 py-2 bg-primary text-white rounded-sm" onClick={handlePrev} disabled={currentStep === 0}>
                    Prev
                </button>
                <button
                    className={`px-4 py-2 rounded-sm text-white ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                    onClick={handleNext}
                    disabled={isNextDisabled}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page;
