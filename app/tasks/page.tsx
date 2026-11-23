import type { Metadata } from "next";
import { CheckCircle2, CheckSquare, Clock } from "lucide-react";
import { TaskListView } from "@/components/tasks/TaskListView";
import { courses, tasks } from "@/data";

export const metadata: Metadata = {
  title: "Tasks | StudyFlow",
  description: "전체 과제 목록, 상태별 필터링 및 마감일을 관리합니다.",
};

export default function TasksPage() {
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "진행 중"
  ).length;
  const completedTasks = tasks.filter((task) => task.status === "완료").length;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section
        aria-label="과제 요약 지표"
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">전체 과제</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#1E293B]">
              {totalTasks}
              <span className="ml-1 text-sm font-medium text-slate-500">
                개
              </span>
            </p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#1E293B]"
            aria-hidden="true"
          >
            <CheckSquare className="h-5 w-5" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">진행 중</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#2563EB]">
              {inProgressTasks}
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
            <p className="text-xs font-medium text-slate-500">완료된 과제</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#047857]">
              {completedTasks}
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

      <TaskListView tasks={tasks} courses={courses} />
    </div>
  );
}
