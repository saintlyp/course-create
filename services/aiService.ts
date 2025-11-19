
import { GoogleGenAI } from "@google/genai";
import { GEMINI_FLASH_MODEL, GEMINI_PRO_MODEL, DEFAULT_PROVIDER_CONFIGS } from "../constants";
import { Language, AIConfig, LLMProvider } from "../types";

export const generateAIResponse = async (
  prompt: string,
  systemInstruction: string,
  lang: Language,
  config: AIConfig,
  task: 'concept' | 'creation' | 'review'
): Promise<string> => {
  const { provider, apiKeys, modelNames } = config;
  const apiKey = apiKeys[provider];
  
  if (!apiKey) {
    return lang === 'cn' 
      ? `请在设置中配置 ${DEFAULT_PROVIDER_CONFIGS[provider].name} 的 API 密钥。`
      : `Please configure the API Key for ${DEFAULT_PROVIDER_CONFIGS[provider].name} in settings.`;
  }

  // 1. Google Gemini (Uses SDK)
  if (provider === 'gemini') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      // Select model based on task (2.5 Flash for fast text, Pro for complex code)
      let modelName = GEMINI_FLASH_MODEL;
      if (task === 'creation' || task === 'review') {
        modelName = GEMINI_PRO_MODEL;
      }
      // Override if user manually specified a model name in settings (optional advanced usage)
      if (modelNames.gemini && modelNames.gemini !== DEFAULT_PROVIDER_CONFIGS.gemini.defaultModel) {
          // Use user specified model if it's different from default, or just stick to logic
          // For now, let's respect the user's override if they typed something specific
          modelName = modelNames.gemini; 
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: task === 'creation' ? 0.2 : 0.7,
        },
      });
      return response.text || "No response.";
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return `Gemini Error: ${error.message || 'Unknown error'}`;
    }
  }

  // 2. OpenAI Compatible Providers (DeepSeek, Kimi, GLM, Volcano)
  // Most of these support the standard /v1/chat/completions format
  try {
    const providerConfig = DEFAULT_PROVIDER_CONFIGS[provider];
    const endpoint = providerConfig.endpoint;
    const model = modelNames[provider] || providerConfig.defaultModel;

    const messages = [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: prompt }
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: task === 'creation' ? 0.2 : 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API responded with ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response content.";

  } catch (error: any) {
    console.error(`${provider} API Error:`, error);
    return `${DEFAULT_PROVIDER_CONFIGS[provider].name} Error: ${error.message || 'Connection failed'}`;
  }
};

// Wrapper functions to maintain interface with components
export const generateConceptExplanation = async (
  topic: string,
  systemInstruction: string,
  lang: Language,
  config: AIConfig
): Promise<string> => {
  const prompt = lang === 'cn' 
      ? `Explain the frontend concept: "${topic}". Structured with Markdown. Include a code snippet. Respond in Chinese.`
      : `Explain the frontend concept: "${topic}". Structured with Markdown. Include a code snippet.`;
  
  return generateAIResponse(prompt, systemInstruction, lang, config, 'concept');
};

export const generateCode = async (
  prompt: string,
  systemInstruction: string,
  lang: Language,
  currentContext: string = "",
  config: AIConfig
): Promise<string> => {
   const fullPrompt = `
      User Request: ${prompt}
      ${currentContext ? `Current Code Context: ${currentContext}` : ''}
      
      Provide the output in a single markdown block with the language specified (e.g., \`\`\`tsx ...).
      ${lang === 'cn' ? 'Explain briefly in Chinese if needed, but keep code standard.' : ''}
    `;
  return generateAIResponse(fullPrompt, systemInstruction, lang, config, 'creation');
};

export const reviewStudentCode = async (
    code: string, 
    systemInstruction: string,
    lang: Language,
    config: AIConfig
): Promise<string> => {
  const prompt = lang === 'cn'
      ? `Review this code for best practices, accessibility, and performance. Respond in Chinese:\n\n${code}`
      : `Review this code for best practices, accessibility, and performance:\n\n${code}`;
  return generateAIResponse(prompt, systemInstruction, lang, config, 'review');
};
