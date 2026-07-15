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
            Create a printable Arabic worksheet based on the following details:
            - الصف الدراسي: ${body.grade || "غير محدد"}
            - الفصل: ${body.section || "غير محدد"}
            - الدرس: ${body.lesson || "غير محدد"}
            - عدد الأسئلة: ${body.questionCount || "غير محدد"}
            - مستوى الصعوبة: ${body.difficulty || "غير محدد"}
            - نوع الأسئلة: ${body.questionType || "غير محدد"}
            - لغة المخرجات: ${body.outputLanguage || "العربية"}
            - ملاحظات إضافية: ${body.notes || "بدون ملاحظات"}

            Return JSON with this exact structure:
            {
              "title": "string",
              "instructions": ["string"],
              "learningObjectives": ["string"],
              "questions": [
                {
                  "number": 1,
                  "prompt": "string",
                  "answer": "string"
                }
              ],
              "answerKey": ["string"],
              "twentyFirstCenturySkills": ["string"],
              "printReady": true
            }
          `
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "worksheet_generator",
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              instructions: { type: "array", items: { type: "string" } },
              learningObjectives: { type: "array", items: { type: "string" } },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    number: { type: "number" },
                    prompt: { type: "string" },
                    answer: { type: "string" }
                  },
                  required: ["number", "prompt", "answer"],
                  additionalProperties: false
                }
              },
              answerKey: { type: "array", items: { type: "string" } },
              twentyFirstCenturySkills: { type: "array", items: { type: "string" } },
              printReady: { type: "boolean" }
            },
            required: ["title", "instructions", "learningObjectives", "questions", "answerKey", "twentyFirstCenturySkills", "printReady"],
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
    console.error("Worksheet generator error:", error);
    return NextResponse.json(
      { error: "Failed to generate the worksheet." },
      { status: 500 }
    );
  }
}
