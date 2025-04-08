// app/Helper/blogGeneration.js
import axios from "axios";
import { generateBlogPrompt } from "@/Helper/Promt";

export const generateBlogWithAi = async (blogData,
    setBlogData,
    setContent,
    setAiContentState,
    setLoading,
    setErrorMessage) => {


    setLoading(true);
    setErrorMessage("");

    const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    const prompt = generateBlogPrompt(blogData?.title);
    const messages = [{ role: "user", content: prompt }];

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: 'google/gemini-2.0-flash-lite-001',
                messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const aiContent = response.data.choices[0]?.message?.content;
        if (aiContent) {
            console.log(aiContent);
            try {
                const editorFormat2 = aiContent.split("```json")?.[1]?.split("```")?.[0];
                const parsed = JSON.parse(editorFormat2);

                // Ensure required fields
                const editorFormat = {
                    ...parsed,
                    time: parsed.time || Date.now(),
                    version: parsed.version || "2.27.0",
                };

                // Validate Editor.js structure
                if (
                    typeof editorFormat !== "object" ||
                    !editorFormat.time ||
                    !editorFormat.version ||
                    !Array.isArray(editorFormat.blocks)
                ) {
                    throw new Error("Invalid Editor.js format.");
                }

                setBlogData((prev) => ({
                    ...prev,
                    blog: editorFormat,
                }));
                setContent(aiContent);
                setAiContentState(aiContent);
            } catch (parseError) {
                console.error("Editor.js JSON Parsing Error:", parseError);
                setErrorMessage("Error Generating content. Please try again.");
            }
        }
    } catch (error) {
        console.error("OpenRouter API error:", error.response?.data || error.message);
        setErrorMessage("Error: Failed to generate blog content. Please try again.");
    } finally {
        setLoading(false);
    }
};
