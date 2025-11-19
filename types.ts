
export enum Sender {
  User = 'user',
  AI = 'ai',
  System = 'system'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  codeBlock?: {
    language: string;
    code: string;
  };
  type?: 'text' | 'lesson_plan' | 'challenge';
}

export interface LessonPlan {
  topic: string;
  summary: string;
  keyConcepts: string[];
  challengePrompt: string;
}

export enum AppMode {
  Dashboard = 'dashboard',
  ConceptExplorer = 'concept', // Knowledge Receiver -> Understanding
  CodeCreator = 'creator',     // Knowledge Creator -> Application
  CodeReview = 'review'        // Critical Thinking
}

export interface CodeSnippet {
  html: string;
  css: string;
  js: string;
}

export type Language = 'en' | 'cn';

// AI Provider Types
export type LLMProvider = 'gemini' | 'deepseek' | 'volcano' | 'kimi' | 'glm';

export interface AIConfig {
  provider: LLMProvider;
  apiKeys: Record<LLMProvider, string>;
  modelNames: Record<LLMProvider, string>;
}

// Knowledge Map Types
export interface KnowledgeNode {
  id: string;
  title: string;
  children?: KnowledgeNode[];
}
