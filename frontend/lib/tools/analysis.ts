// Student analysis tool abstraction.
// This module structures output for performance review and educational insight generation.

export interface StudentAnalysis {
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export function createAnalysis(topic: string, level: string): StudentAnalysis {
  return {
    summary: `Performance summary for ${topic} at ${level}`,
    strengths: ["Understands the core idea"],
    gaps: ["Needs more guided practice"],
    recommendations: ["Provide extra examples and feedback sessions"],
  };
}
