// Shared context model for AI requests.
// This module packages the state needed to produce useful educational outputs,
// including the current user, subject, and any previously generated artifacts.

export interface TeacherContext {
  teacherId?: string;
  subject?: string;
  gradeLevel?: string;
  language: "ar" | "en";
  preferredStyle?: string;
  recentTopics?: string[];
  lessonObjectives?: string[];
}

export interface ContextPayload {
  currentContext: TeacherContext;
  sessionMemory?: Record<string, unknown>;
}

export function buildContext(overrides: Partial<TeacherContext> = {}): TeacherContext {
  return {
    language: "ar",
    preferredStyle: "clear and practical",
    recentTopics: [],
    lessonObjectives: [],
    ...overrides,
  };
}
