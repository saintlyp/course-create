
import { GoogleGenAI, Content } from "@google/genai";
import { GEMINI_FLASH_MODEL, GEMINI_PRO_MODEL } from "../constants";
import { Language } from "../types";

// Ensure API Key is available
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing in process.env");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateConceptExplanation = async (
  topic: string,
  systemInstruction: string,
  lang: Language
): Promise<string> => {
  try {
    const prompt = lang === 'cn' 
      ? `Explain the frontend concept: "${topic}". Structured with Markdown. Include a code snippet. Respond in Chinese.`
      : `Explain the frontend concept: "${topic}". Structured with Markdown. Include a code snippet.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating concept:", error);
    return lang === 'cn' ? "抱歉，解释该概念时出现错误。" : "Sorry, I encountered an error while explaining that concept.";
  }
};

export const generateCode = async (
  prompt: string,
  systemInstruction: string,
  lang: Language,
  currentContext: string = ""
): Promise<string> => {
  try {
    const fullPrompt = `
      User Request: ${prompt}
      ${currentContext ? `Current Code Context: ${currentContext}` : ''}
      
      Provide the output in a single markdown block with the language specified (e.g., \`\`\`tsx ...).
      ${lang === 'cn' ? 'Explain briefly in Chinese if needed, but keep code standard.' : ''}
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_PRO_MODEL, // Using Pro for better coding logic
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      },
    });
    return response.text || "// No code generated";
  } catch (error) {
    console.error("Error generating code:", error);
    return "// Error generating code. Please check your API key or try again.";
  }
};

export const reviewStudentCode = async (
    code: string, 
    systemInstruction: string,
    lang: Language
): Promise<string> => {
  try {
    const prompt = lang === 'cn'
      ? `Review this code for best practices, accessibility, and performance. Respond in Chinese:\n\n${code}`
      : `Review this code for best practices, accessibility, and performance:\n\n${code}`;

    const response = await ai.models.generateContent({
      model: GEMINI_PRO_MODEL,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4,
      },
    });
    return response.text || "No review generated.";
  } catch (error) {
    console.error("Error reviewing code:", error);
    return lang === 'cn' ? "无法进行代码审查。" : "Unable to review code at this time.";
  }
};
