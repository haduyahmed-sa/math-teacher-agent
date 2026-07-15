import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured." },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are an expert Arabic educational assistant. Return valid JSON only. Do not include markdown fences."
        },
        {
          role: "user",
          content: `
            Create a complete Arabic lesson plan based on the following details:
            - الصف الدراسي: ${body.grade || "غير محدد"}
            - الفصل: ${body.section || "غير محدد"}
            - الدرس: ${body.lesson || "غير محدد"}
            - مدة الحصة: ${body.duration || "غير محدد"}
            - عدد الطلاب: ${body.studentCount || "غير محدد"}
            - استراتيجية التدريس: ${body.strategy || "غير محدد"}
            - ملاحظات إضافية: ${body.notes || "بدون ملاحظات"}

            Return JSON with this exact structure:
            {
              "title": "string",
              "summary": "string",
              "objectives": ["string"],
              "preparation": ["string"],
              "implementationSteps": ["string"],
              "activities": ["string"],
              "assessment": ["string"],
              "homework": ["string"],
              "resources": ["string"],
              "differentiation": ["string"],
              "twentyFirstCenturySkills": ["string"]
            }
          `
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "lesson_plan",
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              summary: { type: "string" },
              objectives: { type: "array", items: { type: "string" } },
              preparation: { type: "array", items: { type: "string" } },
              implementationSteps: { type: "array", items: { type: "string" } },
              activities: { type: "array", items: { type: "string" } },
              assessment: { type: "array", items: { type: "string" } },
              homework: { type: "array", items: { type: "string" } },
              resources: { type: "array", items: { type: "string" } },
              differentiation: { type: "array", items: { type: "string" } },
              twentyFirstCenturySkills: { type: "array", items: { type: "string" } }
            },
            required: ["title", "summary", "objectives", "preparation", "implementationSteps", "activities", "assessment", "homework", "resources", "differentiation", "twentyFirstCenturySkills"],
            additionalProperties: false
          },
          strict: true
        }
      }
    });

    const rawText = response.output_text;
    if (!rawText) {
      return NextResponse.json({ error: "No content was generated." }, { status: 500 });
    }

    const parsed = JSON.parse(rawText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Lesson planner error:", error);
    return NextResponse.json(
      { error: "Failed to generate the lesson plan." },
      { status: 500 }
    );
  }
}
