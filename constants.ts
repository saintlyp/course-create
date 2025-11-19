
import { AppMode, Language, LLMProvider, KnowledgeNode } from './types';

export const GEMINI_FLASH_MODEL = 'gemini-2.5-flash';
export const GEMINI_PRO_MODEL = 'gemini-3-pro-preview';

export const DEFAULT_PROVIDER_CONFIGS: Record<LLMProvider, { name: string, defaultModel: string, endpoint: string }> = {
  gemini: { 
    name: 'Google Gemini', 
    defaultModel: GEMINI_FLASH_MODEL,
    endpoint: '' // SDK handles this
  },
  deepseek: { 
    name: 'DeepSeek', 
    defaultModel: 'deepseek-chat',
    endpoint: 'https://api.deepseek.com/chat/completions'
  },
  volcano: { 
    name: 'Volcano Engine (Doubao)', 
    defaultModel: 'doubao-pro-4k', 
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
  },
  kimi: { 
    name: 'Kimi (Moonshot)', 
    defaultModel: 'moonshot-v1-8k',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions'
  },
  glm: { 
    name: 'Zhipu GLM', 
    defaultModel: 'glm-4',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  }
};

export const NAV_ITEMS = [
  { id: AppMode.Dashboard, icon: 'LayoutDashboard' },
  { id: AppMode.ConceptExplorer, icon: 'BrainCircuit' },
  { id: AppMode.CodeCreator, icon: 'Code2' },
  { id: AppMode.CodeReview, icon: 'Microscope' },
];

const KNOWLEDGE_MAP_EN: KnowledgeNode[] = [
  {
    id: 'foundations',
    title: 'Frontend Foundations',
    children: [
      { id: 'html-semantics', title: 'HTML5 Semantics & A11y' },
      { id: 'css-box-model', title: 'CSS Box Model & Layout' },
      { id: 'dom-manipulation', title: 'DOM Manipulation' },
      { id: 'responsive-design', title: 'Responsive Design' }
    ]
  },
  {
    id: 'js-core',
    title: 'JavaScript Core',
    children: [
      { id: 'es6-syntax', title: 'ES6+ Syntax (Arrow fns, Destructuring)' },
      { id: 'async-programming', title: 'Async/Await & Promises' },
      { id: 'closures-scope', title: 'Closures & Scope' },
      { id: 'event-loop', title: 'Event Loop & Concurrency' }
    ]
  },
  {
    id: 'react-ecosystem',
    title: 'React Ecosystem',
    children: [
      { id: 'components-props', title: 'Components & Props' },
      { id: 'hooks-basic', title: 'Hooks (useState, useEffect)' },
      { id: 'state-management', title: 'Global State (Context/Redux)' },
      { id: 'react-performance', title: 'React Performance & Memo' }
    ]
  },
  {
    id: 'modern-tooling',
    title: 'Modern Tooling',
    children: [
      { id: 'bundlers', title: 'Vite & Webpack' },
      { id: 'typescript', title: 'TypeScript Basics' },
      { id: 'tailwind', title: 'Tailwind CSS' },
      { id: 'testing', title: 'Unit & E2E Testing' }
    ]
  }
];

const KNOWLEDGE_MAP_CN: KnowledgeNode[] = [
  {
    id: 'foundations',
    title: '前端基础',
    children: [
      { id: 'html-semantics', title: 'HTML5 语义化与无障碍' },
      { id: 'css-box-model', title: 'CSS 盒模型与布局' },
      { id: 'dom-manipulation', title: 'DOM 操作' },
      { id: 'responsive-design', title: '响应式设计' }
    ]
  },
  {
    id: 'js-core',
    title: 'JavaScript 核心',
    children: [
      { id: 'es6-syntax', title: 'ES6+ 语法 (箭头函数, 解构)' },
      { id: 'async-programming', title: '异步编程 (Async/Await & Promises)' },
      { id: 'closures-scope', title: '闭包与作用域' },
      { id: 'event-loop', title: '事件循环与并发' }
    ]
  },
  {
    id: 'react-ecosystem',
    title: 'React 生态',
    children: [
      { id: 'components-props', title: '组件与 Props' },
      { id: 'hooks-basic', title: 'Hooks (useState, useEffect)' },
      { id: 'state-management', title: '全局状态管理 (Context/Redux)' },
      { id: 'react-performance', title: 'React 性能优化 & Memo' }
    ]
  },
  {
    id: 'modern-tooling',
    title: '现代工具链',
    children: [
      { id: 'bundlers', title: '打包工具 (Vite & Webpack)' },
      { id: 'typescript', title: 'TypeScript 基础' },
      { id: 'tailwind', title: 'Tailwind CSS' },
      { id: 'testing', title: '单元测试 & E2E 测试' }
    ]
  }
];

export const getKnowledgeMap = (lang: Language) => lang === 'cn' ? KNOWLEDGE_MAP_CN : KNOWLEDGE_MAP_EN;

export const GET_SYSTEM_INSTRUCTION_CONCEPT = (lang: Language) => `
You are an expert Frontend Education AI Mentor.
Your goal is to help students transition from passive "Knowledge Receivers" to active "Knowledge Creators".
When explaining a concept:
1. Be concise but deep.
2. Always provide a "Why this matters" context.
3. If applicable, provide a brief code example in Markdown.
4. Encourage the user to modify the code.
${lang === 'cn' ? '5. REPLY IN CHINESE.' : ''}
`;

export const GET_SYSTEM_INSTRUCTION_CREATOR = (lang: Language) => `
You are an AI Pair Programmer for a frontend course. 
The user wants to build something. 
1. Generate clean, semantic HTML, Tailwind CSS, and modern JavaScript/React code.
2. Separate the response into clear sections if possible.
3. After generating, ask the user a critical thinking question about the implementation (e.g., "How would this handle accessibility?" or "How can we optimize the re-renders?").
${lang === 'cn' ? 'REPLY IN CHINESE (but keep code in English).' : ''}
`;

export const GET_SYSTEM_INSTRUCTION_REVIEW = (lang: Language) => `
You are a strict but helpful code reviewer. Highlight 3 pros and 3 areas for improvement.
${lang === 'cn' ? 'REPLY IN CHINESE.' : ''}
`;

export const TRANSLATIONS = {
  en: {
    appTitle: 'GenLearn',
    nav: {
      [AppMode.Dashboard]: 'Overview',
      [AppMode.ConceptExplorer]: 'Concept Explorer',
      [AppMode.CodeCreator]: 'Creation Studio',
      [AppMode.CodeReview]: 'AI Code Review',
    },
    settings: {
        title: 'AI Configuration',
        provider: 'Select Provider',
        apiKey: 'API Key',
        modelName: 'Model Name',
        save: 'Save Configuration',
        close: 'Close',
        description: 'Configure your AI model provider. Keys are stored locally in your browser.'
    },
    dashboard: {
      welcome: "Welcome back, Creator.",
      subtext: "Your journey from consumer to innovator continues today.",
      startCreation: "Start a New Creation",
      startCreationDesc: "Stop copying tutorials. Describe a unique component and let AI help you build the scaffold, then refine it yourself.",
      launchStudio: "Launch Studio",
      conceptDive: "Concept Deep Dive",
      conceptDiveDesc: "Stuck on \"useEffect\" vs \"useLayoutEffect\"? Get an interactive breakdown.",
      exploreConcepts: "Explore Concepts",
      stats: [
        { label: 'Concepts Mastered', value: '12', change: '+2 today' },
        { label: 'Code Generated', value: '450 lines', change: 'Efficiency up' },
        { label: 'AI Collaborations', value: '8 sessions', change: 'Active learner' },
      ]
    },
    concept: {
       title: "Concept Explorer",
       subtitle: "Navigate the knowledge map or search directly.",
       placeholder: "Search for a concept...",
       explore: "Explore",
       synthesizing: "Synthesizing Knowledge...",
       ready: "Select a Topic",
       readyDesc: "Choose a topic from the roadmap on the left to begin your journey.",
       roadmapTitle: "Curriculum"
    },
    creator: {
        title: "Knowledge Creator Studio",
        subtitle: "Describe a UI component or functionality. The AI will generate the structure, letting you focus on logic and refinement.",
        label: "Your Vision",
        placeholder: "E.g., Create a responsive pricing card component using Tailwind CSS with a toggle for monthly/yearly billing...",
        generate: "Generate Code",
        constructing: "Constructing...",
        tipTitle: "Pro Tip",
        tip: "Try asking for specific interactions, like \"Add a hover effect that scales the card\" or \"Use React state to handle the toggle\".",
        output: "Generated Output",
        empty: "Code workspace ready. Awaiting instructions."
    },
    review: {
        title: "AI Code Auditor",
        subtitle: "Paste your code. Get instant feedback on best practices, security, and performance.",
        inputLabel: "INPUT_SOURCE",
        clear: "Clear",
        placeholder: "Paste your React, HTML, or CSS code here...",
        analyzing: "Analyzing...",
        start: "Start Review",
        reportLabel: "AUDIT_REPORT",
        waiting: "Waiting for code input..."
    }
  },
  cn: {
    appTitle: 'GenLearn',
    nav: {
      [AppMode.Dashboard]: '概览',
      [AppMode.ConceptExplorer]: '概念探索',
      [AppMode.CodeCreator]: '创作工坊',
      [AppMode.CodeReview]: '代码审查',
    },
    settings: {
        title: 'AI 配置',
        provider: '选择模型提供商',
        apiKey: 'API 密钥',
        modelName: '模型名称',
        save: '保存配置',
        close: '关闭',
        description: '配置您的 AI 模型提供商。密钥将本地存储在您的浏览器中。'
    },
    dashboard: {
      welcome: "欢迎回来，创造者。",
      subtext: "今天继续你从知识消费者到创新者的旅程。",
      startCreation: "开始新的创作",
      startCreationDesc: "不再只是复制教程。描述一个独特的组件，让 AI 帮你搭建脚手架，然后你自己进行完善。",
      launchStudio: "进入工坊",
      conceptDive: "概念深度解析",
      conceptDiveDesc: "卡在 \"useEffect\" 和 \"useLayoutEffect\" 的区别上了？获取交互式的解析。",
      exploreConcepts: "探索概念",
      stats: [
        { label: '已掌握概念', value: '12', change: '今日 +2' },
        { label: '生成代码', value: '450 行', change: '效率提升' },
        { label: 'AI 协作', value: '8 次会话', change: '积极学习' },
      ]
    },
    concept: {
       title: "概念探索器",
       subtitle: "浏览知识图谱或直接搜索。",
       placeholder: "搜索概念...",
       explore: "探索",
       synthesizing: "正在综合知识...",
       ready: "选择一个主题",
       readyDesc: "从左侧的课程路线图中选择一个主题开始您的旅程。",
       roadmapTitle: "课程大纲"
    },
    creator: {
        title: "知识创作工坊",
        subtitle: "描述一个 UI 组件或功能。AI 将生成结构，让你专注于逻辑和优化。",
        label: "你的构想",
        placeholder: "例如：创建一个使用 Tailwind CSS 的响应式价格卡片组件，带有月付/年付切换功能...",
        generate: "生成代码",
        constructing: "构建中...",
        tipTitle: "专业提示",
        tip: "尝试要求特定的交互，比如“添加一个缩放卡片的悬停效果”或“使用 React state 处理切换”。",
        output: "生成结果",
        empty: "代码工作区就绪。等待指令。"
    },
    review: {
        title: "AI 代码审计",
        subtitle: "粘贴你的代码。即时获取关于最佳实践、安全性和性能的反馈。",
        inputLabel: "输入源",
        clear: "清空",
        placeholder: "在此粘贴您的 React, HTML, 或 CSS 代码...",
        analyzing: "分析中...",
        start: "开始审查",
        reportLabel: "审计报告",
        waiting: "等待代码输入..."
    }
  }
};
