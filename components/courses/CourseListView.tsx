"use client";

import { useMemo, useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import { CourseCard } from "@/components";
import type { Course } from "@/data/types";

export interface CourseWithCounts {
  course: Course;
  taskCount: number;
  questionCount: number;
}

export interface CourseListViewProps {
  items: CourseWithCounts[];
}

type CourseFilter = "전체" | "진행 중" | "완료";

const FILTER_OPTIONS: CourseFilter[] = ["전체", "진행 중", "완료"];

export function CourseListView({ items }: CourseListViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<CourseFilter>("전체");

  const counts = useMemo(() => {
    const completed = items.filter((item) => item.course.progress >= 100).length;
    const inProgress = items.length - completed;
    return {
      전체: items.length,
      "진행 중": inProgress,
      완료: completed,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedFilter === "진행 중") {
      return items.filter((item) => item.course.progress < 100);
    }
    if (selectedFilter === "완료") {
      return items.filter((item) => item.course.progress >= 100);
    }
    return items;
  }, [items, selectedFilter]);

  return (
    <section aria-label="강의 목록">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex flex-wrap items-center gap-2"
          role="group"
          aria-label="강의 진행 상태 필터"
        >
          {FILTER_OPTIONS.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedFilter(filter)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-[#2563EB] bg-[#2563EB] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#1E293B]"
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {counts[filter]}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs font-medium text-slate-500">
          총{" "}
          <span className="font-semibold text-[#1E293B]">
            {filteredItems.length}
          </span>
          개 강의 표시 중
        </p>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map(({ course, taskCount, questionCount }) => (
            <CourseCard
              key={course.id}
              course={course}
              taskCount={taskCount}
              questionCount={questionCount}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400"
            aria-hidden="true"
          >
            <BookOpen className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-semibold text-[#1E293B]">
            해당 조건의 강의가 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            다른 진행 상태 필터를 선택해 수강 강의를 확인해 보세요.
          </p>
          {selectedFilter !== "전체" && (
            <button
              type="button"
              onClick={() => setSelectedFilter("전체")}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              전체 강의 보기
            </button>
          )}
        </div>
      )}
    </section>
  );
}
