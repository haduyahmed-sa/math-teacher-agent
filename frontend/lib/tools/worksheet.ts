// Worksheet generation tool abstraction.
// This module creates a worksheet structure that can be extended with dynamic questions.

export interface Worksheet {
  title: string;
  instructions: string[];
  questions: Array<{ prompt: string; type: string }>;
}

export function createWorksheet(topic: string, level: string): Worksheet {
  return {
    title: `Worksheet: ${topic}`,
    instructions: [`Complete the tasks for ${level}`, `Show your working steps`],
    questions: [
      { prompt: `Explain the main idea of ${topic}`, type: "short-answer" },
      { prompt: `Solve one example related to ${topic}`, type: "problem-solving" },
    ],
  };
}
