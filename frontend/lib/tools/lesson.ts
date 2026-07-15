// Lesson generation tool abstraction.
// This module is responsible for producing lesson plan content in a structured format.
// It is intentionally placeholder-based so it can later integrate with an AI provider.

export interface LessonPlan {
  title: string;
  objectives: string[];
  activities: string[];
  materials: string[];
  assessment: string[];
}

export function createLessonPlan(topic: string, level: string): LessonPlan {
  return {
    title: `Lesson plan for ${topic}`,
    objectives: [`Understand the core concepts of ${topic}`],
    activities: [`Introduce ${topic}`, `Practice guided examples`, `Review key takeaways`],
    materials: ["Whiteboard", "Student handout", "Markers"],
    assessment: [`Ask students to explain the concept in their own words`, `Evaluate short practice tasks`],
  };
}
