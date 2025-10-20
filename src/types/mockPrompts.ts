import type { Prompt } from '../types/prompt';

export const mockPrompts: Prompt[] = [
  {
    _id: '1',
    title: 'React Component Documentation',
    description: 'Generate comprehensive documentation for your React components including props...',
    promptText: 'Generate comprehensive documentation for the following React component...',
    resultText: '# Button Component ##\n\nDescription A reusable button component with multiple variants and sizes. ## Props - variant: primary | secondary | outline - size: sm | md | lg - disabled: boolean',
    images: [],
    aiTool: ['ChatGPT'],
    tags: ['react', 'documentation', 'components', 'typescript'],
    author: {
      _id: '1',
      username: 'Alex Joe',
      level: 'Newbie'
    },
    isPublic: false,
    isDraft: true,
    requiresLevel: 'Newbie',
    difficulty: 'Beginner',
    category: 'Code',
    estimatedTokens: 1200,
    upvotes: 98,
    upvotedBy: [],
    downloads: 87,
    views: 890,
    rating: {
      average: 4.5,
      count: 23
    },
    comments: [],
    version: 1,
    metadata: {
      language: 'English',
      wordCount: 350,
      characterCount: 2100,
      hasImages: false,
      hasCode: true,
      imageCount: 0
    },
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    _id: '2',
    title: 'UI/UX Design Critique',
    description: 'Get detailed feedback on your design decisions, user experience flow, and visual hierarchy...',
    promptText: 'Please provide a detailed critique of the following UI/UX design...',
    resultText: 'Receive detailed insights on layout, color choices, usability, and flow—highlighting strengths, weaknesses, and practical improvements for a more user-friendly experience.',
    images: [],
    aiTool: ['Midjourney'],
    tags: ['ui-ux', 'critique', 'design', 'feedback'],
    author: {
      _id: '2',
      username: 'Desihniguru',
      level: 'Expert'
    },
    isPublic: true,
    isDraft: false,
    requiresLevel: 'Contributor',
    difficulty: 'Intermediate',
    category: 'Design',
    estimatedTokens: 950,
    upvotes: 189,
    upvotedBy: [],
    downloads: 78,
    views: 1034,
    rating: {
      average: 4.7,
      count: 45
    },
    comments: [],
    version: 1,
    metadata: {
      language: 'English',
      wordCount: 280,
      characterCount: 1750,
      hasImages: false,
      hasCode: false,
      imageCount: 0
    },
    createdAt: '2025-01-14T14:30:00Z',
    updatedAt: '2025-01-14T14:30:00Z'
  },
  {
    _id: '3',
    title: 'Creative Writing Sparks',
    description: 'Generate unique story ideas and character development prompts for fiction writers...',
    promptText: 'Generate creative writing prompts...',
    resultText: 'AI reviews your drafts to refine storytelling, polish language, and suggest improvements that make your writing more engaging and impactful.',
    images: [],
    aiTool: ['Claude'],
    tags: ['creative', 'story', 'telling', 'fiction'],
    author: {
      _id: '3',
      username: 'writerpro',
      level: 'Expert'
    },
    isPublic: true,
    isDraft: false,
    requiresLevel: 'Newbie',
    difficulty: 'Advanced',
    category: 'Writing',
    estimatedTokens: 800,
    upvotes: 168,
    upvotedBy: [],
    downloads: 67,
    views: 790,
    rating: {
      average: 4.3,
      count: 31
    },
    comments: [],
    version: 1,
    metadata: {
      language: 'English',
      wordCount: 320,
      characterCount: 1950,
      hasImages: false,
      hasCode: false,
      imageCount: 0
    },
    createdAt: '2025-01-13T09:15:00Z',
    updatedAt: '2025-01-13T09:15:00Z'
  },
  {
    _id: '4',
    title: 'Blog Post Writer',
    description: 'Write a comprehensive blog post about [TOPIC]. The post should be approximately 1500...',
    promptText: 'Write a comprehensive blog post about [TOPIC]...',
    resultText: '# Button Component ##\n\nDescription A reusable button component with multiple variants and sizes. ## Props - variant: primary | secondary | outline - size: sm | md | lg - disabled: boolean',
    images: [],
    aiTool: ['ChatGPT'],
    tags: ['writing', 'blog', 'content', 'seo'],
    author: {
      _id: '1',
      username: 'Alex Joe',
      level: 'Newbie'
    },
    isPublic: true,
    isDraft: false,
    requiresLevel: 'Newbie',
    difficulty: 'Beginner',
    category: 'Writing',
    estimatedTokens: 1500,
    upvotes: 98,
    upvotedBy: [],
    downloads: 67,
    views: 890,
    rating: {
      average: 4.2,
      count: 28
    },
    comments: [],
    version: 1,
    metadata: {
      language: 'English',
      wordCount: 420,
      characterCount: 2500,
      hasImages: false,
      hasCode: false,
      imageCount: 0
    },
    createdAt: '2025-01-12T16:45:00Z',
    updatedAt: '2025-01-12T16:45:00Z'
  },
  {
    _id: '5',
    title: 'Creative Story Generator',
    description: 'Create an engaging short story (800-1000 words) with the following elements: Setting...',
    promptText: 'Create an engaging short story with the following elements...',
    resultText: 'AI reviews your drafts to refine storytelling, polish language, and suggest improvements that make your writing more engaging and impactful.',
    images: [],
    aiTool: ['Claude'],
    tags: ['creative', 'story', 'fiction', 'narrative'],
    author: {
      _id: '3',
      username: 'writerpro',
      level: 'Expert'
    },
    isPublic: true,
    isDraft: false,
    requiresLevel: 'Contributor',
    difficulty: 'Intermediate',
    category: 'Writing',
    estimatedTokens: 1100,
    upvotes: 168,
    upvotedBy: [],
    downloads: 67,
    views: 790,
    rating: {
      average: 4.6,
      count: 38
    },
    comments: [],
    version: 1,
    metadata: {
      language: 'English',
      wordCount: 380,
      characterCount: 2300,
      hasImages: false,
      hasCode: false,
      imageCount: 0
    },
    createdAt: '2025-01-11T11:20:00Z',
    updatedAt: '2025-01-11T11:20:00Z'
  },
  {
    _id: '6',
    title: 'Code Review Assistant',
    description: 'Review the following code for best practices, potential bugs, performance issues, and security...',
    promptText: 'Review the following code for best practices...',
    resultText: 'Receive detailed insights on layout, color choices, usability, and flow—highlighting strengths, weaknesses, and practical improvements for a more user-friendly experience.',
    images: [],
    aiTool: ['ChatGPT'],
    tags: ['code', 'review', 'debugging', 'optimization'],
    author: {
      _id: '2',
      username: 'Desihniguru',
      level: 'Expert'
    },
    isPublic: true,
    isDraft: false,
    requiresLevel: 'Expert',
    difficulty: 'Advanced',
    category: 'Code',
    estimatedTokens: 1300,
    upvotes: 189,
    upvotedBy: [],
    downloads: 78,
    views: 1034,
    rating: {
      average: 4.8,
      count: 52
    },
    comments: [],
    version: 1,
    metadata: {
      language: 'English',
      wordCount: 290,
      characterCount: 1800,
      hasImages: false,
      hasCode: true,
      imageCount: 0
    },
    createdAt: '2025-01-10T13:00:00Z',
    updatedAt: '2025-01-10T13:00:00Z'
  }
];