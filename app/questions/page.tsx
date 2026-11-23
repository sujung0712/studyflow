import type { Metadata } from "next";
import { CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { QuestionListView } from "@/components/questions/QuestionListView";
import { courses, questions } from "@/data";

export const metadata: Metadata = {
  title: "Questions | StudyFlow",
  description: "학습 중 기록한 질문 목록과 해결 상태를 관리합니다.",
};

export default function QuestionsPage() {
  const totalQuestions = questions.length;
  const resolvedQuestions = questions.filter(
    (question) => question.status === "완료"
  ).length;
  const unresolvedQuestions = totalQuestions - resolvedQuestions;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section
        aria-label="질문 요약 지표"
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">전체 질문</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#1E293B]">
              {totalQuestions}
              <span className="ml-1 text-sm font-medium text-slate-500">
                개
              </span>
            </p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#1E293B]"
            aria-hidden="true"
          >
            <HelpCircle className="h-5 w-5" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">미해결 질문</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#2563EB]">
              {unresolvedQuestions}
              <span className="ml-1 text-sm font-medium text-slate-500">
                개
              </span>
            </p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]"
            aria-hidden="true"
          >
            <Clock className="h-5 w-5" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">해결 완료</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#10B981]">
              {resolvedQuestions}
              <span className="ml-1 text-sm font-medium text-slate-500">
                개
              </span>
            </p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]/10 text-[#10B981]"
            aria-hidden="true"
          >
            <CheckCircle2 className="h-5 w-5" />
          </span>
        </div>
      </section>

      <QuestionListView questions={questions} courses={courses} />
    </div>
  );
}
