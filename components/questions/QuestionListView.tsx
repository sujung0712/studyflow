"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { StatusBadge } from "@/components";
import type { Course, Question, StudyStatus } from "@/data/types";

export interface QuestionListViewProps {
  questions: Question[];
  courses: Course[];
}

type StatusFilter = "전체" | StudyStatus;

const STATUS_FILTERS: StatusFilter[] = ["전체", "시작 전", "진행 중", "완료"];

export function QuestionListView({
  questions,
  courses,
}: QuestionListViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("전체");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");

  const courseTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const course of courses) {
      map.set(course.id, course.title);
    }
    return map;
  }, [courses]);

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  }, [questions]);

  const courseFilteredQuestions = useMemo(() => {
    if (selectedCourseId === "all") {
      return sortedQuestions;
    }
    return sortedQuestions.filter(
      (question) => question.courseId === selectedCourseId
    );
  }, [sortedQuestions, selectedCourseId]);

  const statusCounts = useMemo<Record<StatusFilter, number>>(() => {
    const counts: Record<StatusFilter, number> = {
      전체: courseFilteredQuestions.length,
      "시작 전": 0,
      "진행 중": 0,
      완료: 0,
    };

    for (const question of courseFilteredQuestions) {
      counts[question.status] += 1;
    }

    return counts;
  }, [courseFilteredQuestions]);

  const filteredQuestions = useMemo(() => {
    if (selectedStatus === "전체") {
      return courseFilteredQuestions;
    }
    return courseFilteredQuestions.filter(
      (question) => question.status === selectedStatus
    );
  }, [courseFilteredQuestions, selectedStatus]);

  const hasActiveFilter =
    selectedStatus !== "전체" || selectedCourseId !== "all";

  const handleResetFilters = () => {
    setSelectedStatus("전체");
    setSelectedCourseId("all");
  };

  return (
    <section aria-label="질문 목록">
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="질문 상태 필터"
        >
          {STATUS_FILTERS.map((status) => {
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedStatus(status)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "border-[#2563EB] bg-[#2563EB] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#1E293B]"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {statusCounts[status]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <label
            htmlFor="question-course-filter"
            className="text-xs font-medium text-slate-500"
          >
            강의 필터
          </label>
          <select
            id="question-course-filter"
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
            className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-sm font-medium text-[#1E293B] outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15"
          >
            <option value="all">전체 강의</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>최신 등록 순으로 정렬됩니다.</span>
        <span className="font-medium">
          총{" "}
          <strong className="font-semibold text-[#1E293B]">
            {filteredQuestions.length}
          </strong>
          개 질문
        </span>
      </div>

      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((question) => {
            const courseTitle =
              courseTitleMap.get(question.courseId) ?? "미지정 강의";

            return (
              <article
                key={question.id}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/courses/${question.courseId}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      {courseTitle}
                    </Link>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {question.createdAt}
                    </span>
                  </div>
                  <StatusBadge status={question.status} />
                </div>

                <h3 className="mt-3 text-base font-semibold text-[#1E293B]">
                  {question.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {question.content}
                </p>

                {question.answer && (
                  <div className="mt-4 rounded-lg border border-[#10B981]/20 bg-[#10B981]/5 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                      <CheckCircle2 className="h-4 w-4" />
                      답변 정리
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#1E293B]">
                      {question.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400"
            aria-hidden="true"
          >
            <HelpCircle className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-semibold text-[#1E293B]">
            해당 조건의 질문이 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            상태 또는 강의 필터를 변경해 다른 질문을 확인해 보세요.
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              필터 초기화
            </button>
          )}
        </div>
      )}
    </section>
  );
}
