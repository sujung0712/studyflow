"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TaskItem } from "@/components";
import type { StudyStatus, Task } from "@/data/types";

export interface UpcomingTaskEntry {
  task: Task;
  courseTitle: string;
}

export interface UpcomingTasksPanelProps {
  entries: UpcomingTaskEntry[];
}

type UpcomingFilter = "전체" | Extract<StudyStatus, "진행 중" | "시작 전">;

const FILTER_OPTIONS: UpcomingFilter[] = ["전체", "진행 중", "시작 전"];

export function UpcomingTasksPanel({ entries }: UpcomingTasksPanelProps) {
  const [selectedFilter, setSelectedFilter] =
    useState<UpcomingFilter>("전체");

  const counts: Record<UpcomingFilter, number> = {
    전체: entries.length,
    "진행 중": entries.filter((entry) => entry.task.status === "진행 중")
      .length,
    "시작 전": entries.filter((entry) => entry.task.status === "시작 전")
      .length,
  };

  const filteredEntries =
    selectedFilter === "전체"
      ? entries
      : entries.filter((entry) => entry.task.status === selectedFilter);

  return (
    <section
      aria-labelledby="upcoming-tasks-heading"
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2
              id="upcoming-tasks-heading"
              className="text-base font-semibold text-[#1E293B]"
            >
              다가오는 과제
            </h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 tabular-nums">
              {filteredEntries.length}건
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            미완료 과제를 마감일 순으로 확인합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex rounded-lg border border-slate-200 bg-[#F8FAFC] p-1"
            role="group"
            aria-label="다가오는 과제 상태 필터"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = selectedFilter === option;

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedFilter(option)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    isSelected
                      ? "bg-white text-[#2563EB] shadow-sm"
                      : "text-slate-600 hover:text-[#1E293B]"
                  }`}
                >
                  <span>{option}</span>
                  <span
                    className={`tabular-nums ${
                      isSelected ? "text-[#2563EB]" : "text-slate-400"
                    }`}
                  >
                    {counts[option]}
                  </span>
                </button>
              );
            })}
          </div>

          <Link
            href="/tasks"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
          >
            전체 과제
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {filteredEntries.length > 0 ? (
        <div className="mt-4 space-y-2.5">
          {filteredEntries.map(({ task, courseTitle }) => (
            <TaskItem key={task.id} task={task} courseTitle={courseTitle} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-[#F8FAFC] px-4 py-10 text-center">
          <CheckCircle2
            className="h-7 w-7 text-[#10B981]"
            aria-hidden="true"
          />
          <p className="mt-2 text-sm font-medium text-[#1E293B]">
            {selectedFilter === "전체"
              ? "다가오는 과제가 없습니다."
              : `${selectedFilter} 상태의 과제가 없습니다.`}
          </p>
        </div>
      )}
    </section>
  );
}
