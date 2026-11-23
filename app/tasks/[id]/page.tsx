import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  Flag,
  User,
} from "lucide-react";
import { ProgressBar, StatusBadge, TaskItem } from "@/components";
import {
  getCourseById,
  getDueDateLabel,
  getTaskById,
  getTasksByCourseId,
} from "@/data";
import type { TaskPriority } from "@/data/types";

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  높음: "border-[#1E293B] bg-[#1E293B] text-white",
  보통: "border-slate-200 bg-slate-100 text-slate-700",
  낮음: "border-slate-200 bg-slate-50 text-slate-500",
};

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const task = getTaskById(params.id);

  if (!task) {
    notFound();
  }

  const course = getCourseById(task.courseId);
  const isCompleted = task.status === "완료";
  const dueLabel = isCompleted ? "완료됨" : getDueDateLabel(task.dueDate);
  const isUrgentDue =
    !isCompleted && (dueLabel === "오늘 마감" || dueLabel === "마감 지남");
  const relatedTasks = getTasksByCourseId(task.courseId)
    .filter((item) => item.id !== task.id)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <nav
        aria-label="경로 탐색"
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-[#2563EB]"
        >
          <ArrowLeft className="h-4 w-4" />
          과제 목록으로
        </Link>

        <ol className="flex items-center gap-1.5 text-xs text-slate-500">
          <li>
            <Link href="/tasks" className="transition hover:text-[#2563EB]">
              Tasks
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </li>
          <li
            className="max-w-[220px] truncate font-semibold text-[#1E293B] sm:max-w-xs"
            aria-current="page"
          >
            {task.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        <section
          aria-label="과제 상세 정보"
          className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
            >
              <Flag className="h-3 w-3" />
              우선순위 {task.priority}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1E293B]">
            {task.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-[#F8FAFC] px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#1E293B]">
              <Calendar className="h-4 w-4 text-slate-400" />
              마감일 {task.dueDate}
            </span>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <span
              className={`inline-flex items-center gap-1 font-semibold ${
                isUrgentDue
                  ? "text-[#2563EB]"
                  : isCompleted
                    ? "text-[#047857]"
                    : "text-slate-600"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              {dueLabel}
            </span>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              과제 설명
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#1E293B]">
              {task.description}
            </p>
          </div>
        </section>

        <aside aria-label="연결된 강의 정보" className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <BookOpen className="h-4 w-4 text-[#2563EB]" />
              연결된 강의
            </div>

            {course ? (
              <div className="mt-3.5">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {course.semester}
                </span>
                <h3 className="mt-2 text-base font-bold text-[#1E293B]">
                  {course.title}
                </h3>
                <div className="mt-1.5 space-y-1 text-xs text-slate-500">
                  <p className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    {course.instructor}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {course.schedule}
                  </p>
                </div>

                <div className="mt-4">
                  <ProgressBar
                    value={course.progress}
                    label="강의 진행률"
                    size="md"
                  />
                  <p className="mt-1.5 text-xs text-slate-500">
                    {course.completedLessons}/{course.totalLessons}강 완료
                  </p>
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#1D4ED8]"
                >
                  강의 상세 보기
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                연결된 강의 정보를 찾을 수 없습니다.
              </p>
            )}
          </div>
        </aside>
      </div>

      <section aria-label="같은 강의의 다른 과제" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckSquare
              className="h-5 w-5 text-[#2563EB]"
              aria-hidden="true"
            />
            <h3 className="text-base font-bold text-[#1E293B]">
              같은 강의의 다른 과제
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">
              {relatedTasks.length}
            </span>
          </div>
          {course && (
            <Link
              href={`/courses/${course.id}`}
              className="text-xs font-semibold text-[#2563EB] transition hover:underline"
            >
              {course.title} 보기
            </Link>
          )}
        </div>

        {relatedTasks.length > 0 ? (
          <div className="space-y-3">
            {relatedTasks.map((relatedTask) => (
              <TaskItem
                key={relatedTask.id}
                task={relatedTask}
                showCourse={false}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              같은 강의의 다른 과제가 없습니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
