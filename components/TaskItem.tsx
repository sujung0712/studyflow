import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { getDueDateLabel } from "@/data";
import type { Task } from "@/data/types";
import { StatusBadge } from "./StatusBadge";

export interface TaskItemProps {
  task: Task;
  courseTitle?: string;
  showCourse?: boolean;
}

export function TaskItem({
  task,
  courseTitle,
  showCourse = true,
}: TaskItemProps) {
  const dueLabel = getDueDateLabel(task.dueDate);
  const isDueToday = dueLabel === "오늘 마감" && task.status !== "완료";

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition hover:border-[#2563EB]/40 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-[#1E293B] transition group-hover:text-[#2563EB]">
            {task.title}
          </p>
          {showCourse && courseTitle && (
            <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {courseTitle}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {task.dueDate}
          </span>
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          <span
            className={
              isDueToday ? "font-semibold text-[#2563EB]" : "text-slate-600"
            }
          >
            {dueLabel}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
        <StatusBadge status={task.status} />
        <ChevronRight
          className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#2563EB]"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
