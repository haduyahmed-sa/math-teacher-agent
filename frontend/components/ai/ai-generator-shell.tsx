"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

type FieldConfig = {
  label: string;
  name: string;
  placeholder?: string;
};

type AiGeneratorShellProps<TForm extends Record<string, string>> = {
  title: string;
  description: string;
  fields: FieldConfig[];
  initialForm: TForm;
  onSubmit: (form: TForm) => Promise<void>;
  loadingLabel: string;
  successTitle: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  errorTitle: string;
  renderResult: (result: unknown) => ReactNode;
  resultTitle?: string;
};

export default function AiGeneratorShell<TForm extends Record<string, string>>({
  title,
  description,
  fields,
  initialForm,
  onSubmit,
  loadingLabel,
  successTitle,
  emptyStateTitle,
  emptyStateDescription,
  errorTitle,
  renderResult,
  resultTitle,
}: AiGeneratorShellProps<TForm>) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-medium text-violet-700">مساعد الذكاء الاصطناعي</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h1>
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                <span>{field.label}</span>
                <input
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
                />
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? loadingLabel : successTitle}
          </button>
        </form>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-100 shadow-sm">
          {loading && (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/5 text-center">
              <div>
                <p className="text-lg font-semibold">{loadingLabel}</p>
                <p className="mt-2 text-sm text-slate-300">قد يستغرق ذلك بضع ثوانٍ.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-[1.25rem] border border-rose-400/30 bg-rose-500/10 p-5 text-rose-200">
              <p className="font-semibold">{errorTitle}</p>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && !result && (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-[1.25rem] border border-dashed border-white/15 bg-white/5 text-center">
              <div>
                <p className="text-lg font-semibold">{emptyStateTitle}</p>
                <p className="mt-2 text-sm text-slate-300">{emptyStateDescription}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="max-h-[760px] space-y-4 overflow-y-auto pr-1">
              {resultTitle ? (
                <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                  <p className="text-sm text-slate-300">النتيجة</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{resultTitle}</h2>
                </div>
              ) : null}
              {renderResult(result)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
