import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Ensure your API key is loaded from environment variables
    dangerouslyAllowBrowser: true
});

export async function getOpenAIResponse() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Correct model name
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Write a haiku about recursion in programming.",
                },
            ],
        });

    } catch (error) {
        console.error("Error fetching OpenAI response:", error);
    }
}



export async function getGeminiAiResponse(prompt) {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}


