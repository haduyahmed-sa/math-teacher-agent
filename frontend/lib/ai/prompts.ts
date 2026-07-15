// Prompt templates for structured AI generation.
// This module centralizes prompt construction so prompts can be refined and tested
// independently from the UI and tool implementations.

export interface PromptTemplate {
  id: string;
  systemPrompt: string;
  userPrompt: string;
}

export function createLessonPrompt(topic: string, level: string): PromptTemplate {
  return {
    id: "lesson-plan",
    systemPrompt:
      "You are an expert educational assistant specialized in Arabic and international teaching standards.",
    userPrompt: `Create a structured lesson plan for the topic "${topic}" for level "${level}". Include objectives, activities, materials, and assessment ideas.`,
  };
}

export function createWorksheetPrompt(topic: string, level: string): PromptTemplate {
  return {
    id: "worksheet",
    systemPrompt:
      "You are a curriculum designer that creates clear and engaging worksheets.",
    userPrompt: `Create a worksheet for the topic "${topic}" for level "${level}". Include a mix of guided and independent questions.`,
  };
}

export function createQuizPrompt(topic: string, level: string): PromptTemplate {
  return {
    id: "quiz",
    systemPrompt:
      "You are an assessment specialist that writes balanced and well-structured quizzes.",
    userPrompt: `Create a quiz for the topic "${topic}" for level "${level}". Include answer key and difficulty levels.`,
  };
}

export function createAnalysisPrompt(topic: string, level: string): PromptTemplate {
  return {
    id: "analysis",
    systemPrompt:
      "You are an educational analyst that summarizes student performance clearly and accurately.",
    userPrompt: `Analyze student performance for the topic "${topic}" for level "${level}". Highlight strengths, gaps, and recommendations.`,
  };
}

export function createRubricPrompt(topic: string, level: string): PromptTemplate {
  return {
    id: "rubric",
    systemPrompt:
      "You are an assessment rubric designer specializing in clear criteria and measurable outcomes.",
    userPrompt: `Create a scoring rubric for the topic "${topic}" for level "${level}". Include criteria, descriptors, and point values.`,
  };
}
