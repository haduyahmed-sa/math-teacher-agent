// Quiz generation tool abstraction.
// This module defines the shape of quiz content for future AI-generated assessments.

export interface QuizQuestion {
  id: string;
  prompt: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export function createQuiz(topic: string, level: string): Quiz {
  return {
    title: `Quiz: ${topic}`,
    questions: [
      {
        id: "q1",
        prompt: `What is the key concept behind ${topic}?`,
        answer: "Core concept explanation",
        difficulty: "easy",
      },
    ],
  };
}
