import Link from "next/link";
import { BookOpen, CheckSquare, HelpCircle } from "lucide-react";
import type { Course } from "@/data/types";
import { ProgressBar } from "./ProgressBar";

export interface CourseCardProps {
  course: Course;
  taskCount?: number;
  questionCount?: number;
}

export function CourseCard({
  course,
  taskCount,
  questionCount,
}: CourseCardProps) {
  const isCompleted = course.progress >= 100;

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[#2563EB]/40 hover:shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {course.semester}
          </span>
          <h3 className="mt-2 truncate text-base font-semibold text-[#1E293B] transition group-hover:text-[#2563EB]">
            {course.title}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500">{course.instructor}</p>
        </div>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isCompleted
              ? "bg-[#10B981]/10 text-[#10B981]"
              : "bg-[#2563EB]/10 text-[#2563EB]"
          }`}
          aria-hidden="true"
        >
          <BookOpen className="h-4 w-4" />
        </span>
      </div>

      <ProgressBar value={course.progress} label="진행률" size="md" />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="font-medium text-slate-600">
          {course.completedLessons}/{course.totalLessons}강 완료
        </span>
        {(taskCount !== undefined || questionCount !== undefined) && (
          <div className="flex items-center gap-3">
            {taskCount !== undefined && (
              <span className="inline-flex items-center gap-1">
                <CheckSquare className="h-3.5 w-3.5 text-slate-400" />
                과제 {taskCount}개
              </span>
            )}
            {questionCount !== undefined && (
              <span className="inline-flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                질문 {questionCount}개
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
