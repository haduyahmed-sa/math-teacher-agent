// Rubric generation tool abstraction.
// This module defines evaluation criteria that can later be used with AI-generated assessments.

export interface RubricCriterion {
  name: string;
  description: string;
  points: number;
}

export interface Rubric {
  title: string;
  criteria: RubricCriterion[];
}

export function createRubric(topic: string, level: string): Rubric {
  return {
    title: `Rubric: ${topic}`,
    criteria: [
      { name: "Understanding", description: `Shows understanding of ${topic}`, points: 5 },
      { name: "Application", description: `Applies the concept correctly`, points: 5 },
    ],
  };
}
