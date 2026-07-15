import * as XLSX from "xlsx";

export type StudentRecord = Record<string, string | number | boolean | null>;

export type SummaryMetrics = {
  average: number;
  median: number;
  mode: string;
  standardDeviation: number;
  highest: number;
  lowest: number;
  passRate: number;
  totalStudents: number;
};

export type QuestionAnalysis = {
  column: string;
  label: string;
  correctRate: number;
  incorrectRate: number;
  difficulty: number;
  discrimination: number;
  bloomLevel: string;
};

export type StudentInsight = {
  name: string;
  score: number;
  improvement?: number;
};

export type RecommendationReport = {
  strengths: string[];
  weaknesses: string[];
  underdevelopedSkills: string[];
  correctiveRecommendations: string[];
  suggestedActivities: string[];
  suggestedHomework: string[];
};

export type AnalyticsResult = {
  rows: StudentRecord[];
  scoreColumn: string;
  questionColumns: string[];
  summary: SummaryMetrics;
  distribution: Array<{ label: string; value: number }>;
  gradeDistribution: Array<{ label: string; value: number }>;
  passFailDistribution: Array<{ label: string; value: number }>;
  questions: QuestionAnalysis[];
  bestStudents: StudentInsight[];
  weakestStudents: StudentInsight[];
  atRiskStudents: StudentInsight[];
  improvementStudents: StudentInsight[];
  report: RecommendationReport;
};

function roundNumber(value: number): number {
  return Number(value.toFixed(2));
}

function parseNumericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.-]/g, "").trim();
    if (!cleaned) {
      return null;
    }

    const numeric = Number(cleaned);
    return Number.isFinite(numeric) ? numeric : null;
  }

  return null;
}

function classifyAnswer(value: unknown): "correct" | "incorrect" | "unknown" {
  if (typeof value === "number") {
    return value > 0 ? "correct" : "incorrect";
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["صح", "صحيح", "correct", "true", "yes", "y", "1", "✓", "✔", "م", "ص", "done"].includes(normalized)) {
      return "correct";
    }

    if (["خطأ", "incorrect", "false", "no", "n", "0", "✗", "x", "غ", "خ"].includes(normalized)) {
      return "incorrect";
    }
  }

  return "unknown";
}

function inferScoreColumn(rows: StudentRecord[]): string {
  const preferred = ["score", "الدرجة", "total", "المجموع", "final_score", "finalscore", "exam_score"];

  for (const key of preferred) {
    if (rows.some((row) => row[key] !== undefined)) {
      return key;
    }
  }

  const candidate = Object.keys(rows[0] ?? {}).find((key) => {
    const normalized = key.toLowerCase();
    return normalized.includes("score") || normalized.includes("درجة") || normalized.includes("مجموع") || normalized.includes("total");
  });

  return candidate ?? "score";
}

function inferQuestionColumns(rows: StudentRecord[], scoreColumn: string): string[] {
  const ignored = new Set([scoreColumn, "student", "student_name", "الطالب", "الاسم", "name", "grade", "الصف", "class", "section", "الفصل", "school", "المعلم", "teacher"]);

  return Object.keys(rows[0] ?? {})
    .filter((key) => {
      const normalized = key.toLowerCase();
      return !ignored.has(normalized) && !ignored.has(key) && (
        normalized.includes("question") ||
        normalized.includes("سؤال") ||
        normalized.includes("q") ||
        normalized.includes("item") ||
        normalized.includes("skill") ||
        normalized.includes("bloom")
      );
    })
    .filter((key) => rows.some((row) => row[key] !== undefined && row[key] !== ""));
}

function inferBloomLevel(columnName: string): string {
  const normalized = columnName.toLowerCase();
  if (normalized.includes("تقييم") || normalized.includes("evaluate") || normalized.includes("compare")) {
    return "تقييم";
  }
  if (normalized.includes("تحليل") || normalized.includes("analyze") || normalized.includes("اختبار")) {
    return "تحليل";
  }
  if (normalized.includes("تطبيق") || normalized.includes("apply") || normalized.includes("حل")) {
    return "تطبيق";
  }
  if (normalized.includes("فهم") || normalized.includes("understand") || normalized.includes("وضح")) {
    return "فهم";
  }
  if (normalized.includes("خلق") || normalized.includes("create") || normalized.includes("صمم")) {
    return "خلق";
  }
  return "تذكر";
}

function buildDistribution(values: number[]): Array<{ label: string; value: number }> {
  if (values.length === 0) {
    return [];
  }

  const maxValue = Math.max(...values);
  const safeMax = maxValue > 0 ? maxValue : 100;
  const bucketCount = 10;
  const bucketSize = Math.max(1, Math.ceil(safeMax / bucketCount));
  const buckets = new Array(bucketCount).fill(0);

  values.forEach((value) => {
    const bucketIndex = Math.min(bucketCount - 1, Math.floor(value / bucketSize));
    buckets[bucketIndex] += 1;
  });

  return buckets.map((count, index) => ({
    label: `${index * bucketSize}-${(index + 1) * bucketSize}`,
    value: count,
  }));
}

function buildGradeDistribution(values: number[]): Array<{ label: string; value: number }> {
  const buckets = [
    { label: "A (90+)", value: 0 },
    { label: "B (80-89)", value: 0 },
    { label: "C (70-79)", value: 0 },
    { label: "D (60-69)", value: 0 },
    { label: "F (<60)", value: 0 },
  ];

  values.forEach((value) => {
    if (value >= 90) buckets[0].value += 1;
    else if (value >= 80) buckets[1].value += 1;
    else if (value >= 70) buckets[2].value += 1;
    else if (value >= 60) buckets[3].value += 1;
    else buckets[4].value += 1;
  });

  return buckets;
}

function buildPassFailDistribution(values: number[]): Array<{ label: string; value: number }> {
  const pass = values.filter((value) => value >= 60).length;
  const fail = values.length - pass;
  return [
    { label: "ناجح", value: pass },
    { label: "راسب", value: fail },
  ];
}

function buildSummary(values: number[]): SummaryMetrics {
  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const median = sorted.length ? (sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)]) : 0;

  const frequency = new Map<number, number>();
  sorted.forEach((value) => frequency.set(value, (frequency.get(value) ?? 0) + 1));
  const modeEntry = [...frequency.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0];

  const variance = values.length > 1 ? values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1) : 0;
  const standardDeviation = Math.sqrt(variance);

  return {
    average: roundNumber(mean),
    median: roundNumber(median),
    mode: modeEntry ? `${modeEntry[0]}` : "غير متوفر",
    standardDeviation: roundNumber(standardDeviation),
    highest: roundNumber(Math.max(...values)),
    lowest: roundNumber(Math.min(...values)),
    passRate: roundNumber(values.length ? (values.filter((value) => value >= 60).length / values.length) * 100 : 0),
    totalStudents: values.length,
  };
}

function analyzeQuestions(rows: StudentRecord[], scoreColumn: string, questionColumns: string[]): QuestionAnalysis[] {
  return questionColumns.map((column) => {
    const answers = rows.map((row) => classifyAnswer(row[column]));
    const correctCount = answers.filter((answer) => answer === "correct").length;
    const incorrectCount = answers.filter((answer) => answer === "incorrect").length;
    const total = correctCount + incorrectCount;

    const correctRate = total ? roundNumber((correctCount / total) * 100) : 0;
    const incorrectRate = total ? roundNumber((incorrectCount / total) * 100) : 0;
    const difficulty = correctRate;

    const sortedByScore = [...rows].sort((left, right) => {
      const leftScore = parseNumericValue(left[scoreColumn]) ?? 0;
      const rightScore = parseNumericValue(right[scoreColumn]) ?? 0;
      return rightScore - leftScore;
    });

    const topCount = Math.max(1, Math.ceil(sortedByScore.length * 0.27));
    const bottomCount = Math.max(1, Math.ceil(sortedByScore.length * 0.27));
    const topGroup = sortedByScore.slice(0, topCount);
    const bottomGroup = sortedByScore.slice(-bottomCount);

    const topCorrect = topGroup.filter((row) => classifyAnswer(row[column]) === "correct").length / Math.max(1, topGroup.length);
    const bottomCorrect = bottomGroup.filter((row) => classifyAnswer(row[column]) === "correct").length / Math.max(1, bottomGroup.length);
    const discrimination = roundNumber((topCorrect - bottomCorrect) * 100);

    return {
      column,
      label: column.replace(/_/g, " "),
      correctRate,
      incorrectRate,
      difficulty,
      discrimination,
      bloomLevel: inferBloomLevel(column),
    };
  });
}

function buildStudentInsigths(rows: StudentRecord[], scoreColumn: string): {
  bestStudents: StudentInsight[];
  weakestStudents: StudentInsight[];
  atRiskStudents: StudentInsight[];
  improvementStudents: StudentInsight[];
} {
  const parsedRows = rows
    .map((row) => {
      const name = [row.student_name, row.studentName, row.name, row.الاسم, row.الطالب].find((value) => typeof value === "string" && value.trim()) ?? "طالب";
      const score = parseNumericValue(row[scoreColumn]) ?? 0;
      return { name: String(name), score, row };
    })
    .sort((left, right) => right.score - left.score);

  const bestStudents = parsedRows.slice(0, 3).map(({ name, score }) => ({ name, score }));
  const weakestStudents = [...parsedRows].reverse().slice(0, 3).map(({ name, score }) => ({ name, score }));
  const atRiskStudents = parsedRows.filter(({ score }) => score < 60).slice(0, 3).map(({ name, score }) => ({ name, score }));

  const testColumns = Object.keys(parsedRows[0]?.row ?? {}).filter((key) => /test|exam|assessment|quiz|midterm|final/i.test(key) && key !== scoreColumn);
  const improvementStudents = parsedRows
    .map(({ name, row }) => {
      const historyValues = testColumns
        .map((key) => parseNumericValue(row[key]))
        .filter((value): value is number => typeof value === "number");
      if (historyValues.length < 2) {
        return null;
      }
      const improvement = historyValues[historyValues.length - 1] - historyValues[0];
      return { name, score: improvement, improvement };
    })
    .filter((value): value is { name: string; score: number; improvement: number } => value !== null)
    .sort((left, right) => right.improvement - left.improvement)
    .map(({ name, score, improvement }) => ({ name, score, improvement } satisfies StudentInsight));

  return {
    bestStudents,
    weakestStudents,
    atRiskStudents,
    improvementStudents: improvementStudents.slice(0, 3),
  };
}

function buildRecommendationReport(summary: SummaryMetrics, questions: QuestionAnalysis[], students: { atRiskStudents: StudentInsight[]; bestStudents: StudentInsight[] }, scoreColumn: string, rows: StudentRecord[]): RecommendationReport {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const underdevelopedSkills: string[] = [];
  const correctiveRecommendations: string[] = [];
  const suggestedActivities: string[] = [];
  const suggestedHomework: string[] = [];

  if (summary.average >= 70) {
    strengths.push("المستوى العام للطلاب جيد، ويظهر تحسنًا واضحًا في متوسط الدرجات.");
  } else {
    weaknesses.push("متوسط الدرجات يحتاج إلى تدخل تدريسي سريع لرفع مستوى الأداء العام.");
  }

  if (summary.passRate >= 75) {
    strengths.push(`نسبة النجاح ${summary.passRate}% تعكس وجود قاعدة قوية من الطلاب المتقدمين.`);
  } else {
    weaknesses.push(`نسبة النجاح ${summary.passRate}% تشير إلى الحاجة إلى دعم إضافي للطلاب ذوي الأداء المتراجع.`);
  }

  const lowQuestions = questions.filter((question) => question.correctRate < 60).slice(0, 3);
  const highQuestions = questions.filter((question) => question.correctRate >= 75).slice(0, 3);

  if (highQuestions.length > 0) {
    strengths.push(`الأسئلة مثل ${highQuestions.map((item) => item.label).join("، ")} حققت أداءً قويًا.`);
  }

  if (lowQuestions.length > 0) {
    weaknesses.push(`الأسئلة مثل ${lowQuestions.map((item) => item.label).join("، ")} تحتاج إلى مراجعة وتدريب إضافي.`);
    underdevelopedSkills.push(`مراجعة المفاهيم الأساسية المرتبطة بـ ${lowQuestions.map((item) => item.label).join("، ")}.`);
  }

  if (students.atRiskStudents.length > 0) {
    correctiveRecommendations.push(`إعطاء جلسات دعم فردية أو جماعية للطلاب ${students.atRiskStudents.map((student) => student.name).join("، ")}.`);
  }

  if (summary.average < 70) {
    correctiveRecommendations.push("إعادة شرح المفاهيم الأساسية باستخدام تمارين تطبيقية قصيرة ومراجعة سريعة قبل كل اختبار جديد.");
  }

  if (questions.some((question) => question.discrimination < 0)) {
    correctiveRecommendations.push("إعادة صياغة بعض الأسئلة التي لا تميز بين الطلاب المتقدمين والمتأخرين بشكل كافٍ.");
  }

  suggestedActivities.push("تنفيذ نشاط تعاوني يركز على المفاهيم التي أظهرت ضعفًا في نسبة الإجابة الصحيحة.");
  suggestedActivities.push("استخدام أسئلة قصيرة الإجابة مع تغذية راجعة فورية بعد كل جلسة.");
  suggestedHomework.push("تعيين واجب تدريبي قصير على الموضوعات التي سجلت أقل نسبة نجاح.");
  suggestedHomework.push("طلب من الطلاب مراجعة الأخطاء الشائعة في أسئلة التحليل والتطبيق.");

  return {
    strengths,
    weaknesses,
    underdevelopedSkills,
    correctiveRecommendations,
    suggestedActivities,
    suggestedHomework,
  };
}

export function analyzeStudentData(rows: StudentRecord[], scoreColumn?: string): AnalyticsResult {
  const cleanedRows = rows.filter((row) => Object.keys(row).length > 0);

  if (cleanedRows.length === 0) {
    return {
      rows: [],
      scoreColumn: scoreColumn ?? "score",
      questionColumns: [],
      summary: {
        average: 0,
        median: 0,
        mode: "غير متوفر",
        standardDeviation: 0,
        highest: 0,
        lowest: 0,
        passRate: 0,
        totalStudents: 0,
      },
      distribution: [],
      gradeDistribution: [],
      passFailDistribution: [],
      questions: [],
      bestStudents: [],
      weakestStudents: [],
      atRiskStudents: [],
      improvementStudents: [],
      report: {
        strengths: [],
        weaknesses: [],
        underdevelopedSkills: [],
        correctiveRecommendations: [],
        suggestedActivities: [],
        suggestedHomework: [],
      },
    };
  }

  const resolvedScoreColumn = scoreColumn ?? inferScoreColumn(cleanedRows);
  const numericScores = cleanedRows
    .map((row) => parseNumericValue(row[resolvedScoreColumn]))
    .filter((value): value is number => typeof value === "number");

  const questionColumns = inferQuestionColumns(cleanedRows, resolvedScoreColumn);
  const summary = buildSummary(numericScores);
  const distribution = buildDistribution(numericScores);
  const gradeDistribution = buildGradeDistribution(numericScores);
  const passFailDistribution = buildPassFailDistribution(numericScores);
  const questions = analyzeQuestions(cleanedRows, resolvedScoreColumn, questionColumns);
  const studentInsights = buildStudentInsigths(cleanedRows, resolvedScoreColumn);
  const report = buildRecommendationReport(summary, questions, studentInsights, resolvedScoreColumn, cleanedRows);

  return {
    rows: cleanedRows,
    scoreColumn: resolvedScoreColumn,
    questionColumns,
    summary,
    distribution,
    gradeDistribution,
    passFailDistribution,
    questions,
    bestStudents: studentInsights.bestStudents,
    weakestStudents: studentInsights.weakestStudents,
    atRiskStudents: studentInsights.atRiskStudents,
    improvementStudents: studentInsights.improvementStudents,
    report,
  };
}

export function parseCsvText(text: string): StudentRecord[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(/,|\t/).map((heading) => heading.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(/,|\t/).map((cell) => cell.trim());
    const row: StudentRecord = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    return row;
  });
}

export function parseExcelFile(arrayBuffer: ArrayBuffer): StudentRecord[] {
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" }) as StudentRecord[];
}
