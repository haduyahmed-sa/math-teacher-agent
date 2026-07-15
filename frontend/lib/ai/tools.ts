// Tool registry for the AI agent.
// This module declares the available tool capabilities and gives the agent a clear
// boundary between orchestration and domain-specific operations.

import type { AgentRequest } from "./agent";

export interface ToolDefinition {
  name: string;
  description: string;
  supportedTasks: string[];
}

export interface ToolExecutionContext {
  request: AgentRequest;
}

export const toolRegistry: ToolDefinition[] = [
  {
    name: "lessonTool",
    description: "Generates lesson plans and teaching materials.",
    supportedTasks: ["lesson"],
  },
  {
    name: "worksheetTool",
    description: "Generates worksheets and exercise sets.",
    supportedTasks: ["worksheet"],
  },
  {
    name: "quizTool",
    description: "Generates quizzes and answer keys.",
    supportedTasks: ["quiz"],
  },
  {
    name: "analysisTool",
    description: "Analyzes performance and student outcome data.",
    supportedTasks: ["analysis"],
  },
  {
    name: "rubricTool",
    description: "Creates evaluation rubrics and grading criteria.",
    supportedTasks: ["rubric"],
  },
];

export function resolveToolsForTask(taskType: AgentRequest["taskType"]): ToolDefinition[] {
  return toolRegistry.filter((tool) => tool.supportedTasks.includes(taskType));
}
