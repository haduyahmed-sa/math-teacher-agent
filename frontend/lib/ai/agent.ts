// AI agent orchestration layer.
// This module defines the high-level contract for the AI workflow orchestrator.
// In the current version it uses placeholder logic so the application can evolve
// without coupling the UI to a specific provider.

export type AgentTaskType = "lesson" | "worksheet" | "quiz" | "analysis" | "rubric";

export interface AgentRequest {
  taskType: AgentTaskType;
  topic: string;
  level: string;
  language: "ar" | "en";
  context?: Record<string, unknown>;
  instructions?: string[];
}

export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  warnings?: string[];
}

export interface Agent {
  run<T>(request: AgentRequest): Promise<AgentResponse<T>>;
}

export class PlaceholderAgent implements Agent {
  async run<T>(request: AgentRequest): Promise<AgentResponse<T>> {
    return {
      success: true,
      message: `Placeholder agent executed ${request.taskType} for ${request.topic}`,
      warnings: ["No AI provider connected yet."],
    } as AgentResponse<T>;
  }
}
