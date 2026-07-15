"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { jsPDF } from "jspdf";
import { analyzeStudentData, parseCsvText, parseExcelFile, type AnalyticsResult, type StudentRecord } from "@/lib/analytics/student-analytics";

type ImportMode = "excel" | "csv" | "paste";

function areNumericValues(values: unknown[]): boolean {
  return values.every((value) => typeof value === "number" || typeof value === "string");
}

function parsePastedRows(text: string): StudentRecord[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(/\t|\s{2,}|,/).map((heading) => heading.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(/\t|\s{2,}|,/).map((cell) => cell.trim());
    const row: StudentRecord = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    return row;
  });
}

export default function StudentAnalyticsDashboard() {
  const [importMode, setImportMode] = useState<ImportMode>("excel");
  const [rawText, setRawText] = useState("");
  const [data, setData] = useState<StudentRecord[]>([]);
  const [result, setResult] = useState<AnalyticsResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      if (file.name.toLowerCase().endsWith(".csv")) {
        const text = await file.text();
        const parsedRows = parseCsvText(text);
        setData(parsedRows);
        setResult(analyzeStudentData(parsedRows));
      } else {
        const arrayBuffer = await file.arrayBuffer();
        const parsedRows = parseExcelFile(arrayBuffer);
        setData(parsedRows);
        setResult(analyzeStudentData(parsedRows));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر قراءة الملف.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasteSubmit = () => {
    setLoading(true);
    setError(null);
    try {
      const parsedRows = parsePastedRows(rawText);
      setData(parsedRows);
      setResult(analyzeStudentData(parsedRows));
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحليل النص المرفق.");
    } finally {
      setLoading(false);
    }
  };

  const metrics = useMemo(() => result?.summary, [result]);

  const exportPdf = () => {
    if (!result) return;

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("تقرير تحليل نتائج الطلاب", pageWidth / 2, 36, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`الطلاب: ${result.summary.totalStudents} | المتوسط: ${result.summary.average} | نسبة النجاح: ${result.summary.passRate}%`, 40, 70);

    let y = 100;
    const addSection = (title: string, lines: string[]) => {
      if (y > 760) {
        doc.addPage();
        y = 60;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(title, 40, y);
      y += 16;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      lines.forEach((line) => {
        doc.text(line, 50, y);
        y += 14;
      });
    };

    addSection("نقاط القوة", result.report.strengths);
    addSection("نقاط الضعف", result.report.weaknesses);
    addSection("المهارات غير المتقنة", result.report.underdevelopedSkills);
    addSection("التوصيات العلاجية", result.report.correctiveRecommendations);
    addSection("الأنشطة المقترحة", result.report.suggestedActivities);
    addSection("الواجبات المقترحة", result.report.suggestedHomework);

    doc.save("student-analytics-report.pdf");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-medium text-violet-700">Student Analytics Dashboard</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">لوحة تحليل نتائج الطلاب</h1>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          ارفع الملف أو الصق البيانات ثم استعرض التحليلات، الرسوم، والتوصيات الاحترافية جاهزة للتصدير.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
          <div className="flex gap-2">
            {(["excel", "csv", "paste"] as ImportMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setImportMode(mode)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${importMode === mode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}
              >
                {mode === "excel" ? "Excel" : mode === "csv" ? "CSV" : "نسخ ولصق"}
              </button>
            ))}
          </div>

          {importMode !== "paste" ? (
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileUpload} />
              <span className="text-3xl">📁</span>
              <p className="mt-3 text-lg font-semibold text-slate-900">ارفع ملفًا بصيغة {importMode === "excel" ? "Excel" : "CSV"}</p>
              <p className="mt-2 text-sm text-slate-600">سيتم قراءته تلقائيًا وتحليله مع إنشاء التقرير الذكي.</p>
              {fileName ? <p className="mt-4 text-sm font-medium text-violet-700">{fileName}</p> : null}
            </label>
          ) : (
            <div className="mt-6 space-y-3">
              <textarea
                value={rawText}
                onChange={(event) => setRawText(event.target.value)}
                rows={10}
                className="w-full rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-violet-400"
                placeholder="الصق الجدول هنا... مثال: الاسم,الدرجة,السؤال1,السؤال2"
              />
              <button
                type="button"
                onClick={handlePasteSubmit}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                تحليل البيانات
              </button>
            </div>
          )}

          {error ? <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
          {loading ? <p className="mt-4 text-sm text-slate-500">جارٍ تحليل البيانات...</p> : null}
        </div>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-100 shadow-sm">
          {!result ? (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-[1.25rem] border border-dashed border-white/15 bg-white/5 p-6 text-center">
              <div>
                <p className="text-lg font-semibold">جاهز لاستقبال البيانات</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">لن يتم استخدام بيانات وهمية داخل الكود النهائي؛ ستظهر التحليلات فور تحميل البيانات الحقيقية.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">ملخص سريع</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <MetricCard label="المتوسط" value={`${metrics?.average ?? 0}`} />
                  <MetricCard label="الوسيط" value={`${metrics?.median ?? 0}`} />
                  <MetricCard label="المنوال" value={`${metrics?.mode ?? 0}`} />
                  <MetricCard label="الانحراف المعياري" value={`${metrics?.standardDeviation ?? 0}`} />
                  <MetricCard label="أعلى درجة" value={`${metrics?.highest ?? 0}`} />
                  <MetricCard label="أقل درجة" value={`${metrics?.lowest ?? 0}`} />
                  <MetricCard label="نسبة النجاح" value={`${metrics?.passRate ?? 0}%`} />
                  <MetricCard label="عدد الطلاب" value={`${metrics?.totalStudents ?? 0}`} />
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">التوزيعات</h2>
                  <button type="button" onClick={exportPdf} className="rounded-full bg-violet-500 px-3 py-2 text-sm font-semibold text-white">تصدير PDF</button>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <MiniChart title="توزيع الدرجات" data={result.distribution} />
                  <MiniChart title="توزيع المستويات" data={result.gradeDistribution} />
                  <MiniChart title="النجاح والرسوب" data={result.passFailDistribution} />
                  <MiniChart title="تحليل الأسئلة" data={result.questions.map((item) => ({ label: item.label, value: item.correctRate }))} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {result ? (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">تحليل الأسئلة</h2>
              <div className="mt-4 space-y-3">
                {result.questions.map((item) => (
                  <div key={item.column} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{item.bloomLevel}</span>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <p>نسبة الإجابة الصحيحة: {item.correctRate}%</p>
                      <p>نسبة الخطأ: {item.incorrectRate}%</p>
                      <p>معامل الصعوبة: {item.difficulty}</p>
                      <p>معامل التمييز: {item.discrimination}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">تحليل الطلاب</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <InsightList title="أفضل الطلاب" items={result.bestStudents} />
                <InsightList title="أضعف الطلاب" items={result.weakestStudents} />
                <InsightList title="المعرضون للتعثر" items={result.atRiskStudents} />
                <InsightList title="التحسن بين الاختبارات" items={result.improvementStudents} />
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">التوصيات الذكية</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <RecommendationCard title="نقاط القوة" items={result.report.strengths} />
              <RecommendationCard title="نقاط الضعف" items={result.report.weaknesses} />
              <RecommendationCard title="المهارات غير المتقنة" items={result.report.underdevelopedSkills} />
              <RecommendationCard title="التوصيات العلاجية" items={result.report.correctiveRecommendations} />
              <RecommendationCard title="الأنشطة المقترحة" items={result.report.suggestedActivities} />
              <RecommendationCard title="الواجبات المقترحة" items={result.report.suggestedHomework} />
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-white/10 bg-slate-900/60 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function MiniChart({ title, data }: { title: string; data: Array<{ label: string; value: number }> }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-[1.1rem] border border-white/10 bg-slate-900/60 p-3">
      <p className="text-sm font-semibold text-slate-100">{title}</p>
      <div className="mt-3 space-y-2">
        {data.map((item) => (
          <div key={`${title}-${item.label}`}>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-sky-500" style={{ width: `${(item.value / maxValue) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightList({ title, items }: { title: string; items: Array<{ name: string; score: number; improvement?: number }> }) {
  return (
    <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.length ? items.map((item) => (
          <div key={`${title}-${item.name}`} className="rounded-2xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
            <p className="text-sm text-slate-600">{item.score} {item.improvement !== undefined ? `(${item.improvement > 0 ? "+" : ""}${item.improvement})` : ""}</p>
          </div>
        )) : <p className="text-sm text-slate-500">لا توجد بيانات كافية.</p>}
      </div>
    </div>
  );
}

function RecommendationCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
        {items.length ? items.map((item) => <li key={`${title}-${item}`} className="rounded-2xl bg-white p-3">{item}</li>) : <li className="rounded-2xl bg-white p-3">لا توجد ملاحظات حالياً.</li>}
      </ul>
    </div>
  );
}
