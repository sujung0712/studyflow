import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { ProgressBar, StatusBadge } from "@/components";
import {
  UpcomingTasksPanel,
  type UpcomingTaskEntry,
} from "@/components/dashboard/UpcomingTasksPanel";
import {
  TODAY_DATE,
  courses,
  getCourseTitleById,
  getTasksByCourseId,
  questions,
  tasks,
} from "@/data";
import type { StudyStatus } from "@/data/types";

interface StatusSummaryItem {
  status: StudyStatus;
  count: number;
  percentage: number;
  barClass: string;
}

export default function DashboardPage() {
  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + course.progress, 0) /
            courses.length
        )
      : 0;

  const totalLessons = courses.reduce(
    (sum, course) => sum + course.totalLessons,
    0
  );
  const completedLessons = courses.reduce(
    (sum, course) => sum + course.completedLessons,
    0
  );
  const completedCoursesCount = courses.filter(
    (course) => course.progress >= 100
  ).length;
  const activeCoursesCount = courses.length - completedCoursesCount;

  const totalTasks = tasks.length;
  const notStartedTaskCount = tasks.filter(
    (task) => task.status === "시작 전"
  ).length;
  const inProgressTaskCount = tasks.filter(
    (task) => task.status === "진행 중"
  ).length;
  const completedTaskCount = tasks.filter(
    (task) => task.status === "완료"
  ).length;
  const taskCompletionRate =
    totalTasks > 0 ? Math.round((completedTaskCount / totalTasks) * 100) : 0;

  const unresolvedQuestionCount = questions.filter(
    (question) => question.status !== "완료"
  ).length;
  const resolvedQuestionCount = questions.length - unresolvedQuestionCount;

  const kpiCards = [
    {
      label: "전체 평균 진행률",
      value: `${averageProgress}%`,
      helper: `수강 과목 ${courses.length}개 기준`,
      icon: TrendingUp,
      iconBg: "bg-[#2563EB]/10 text-[#2563EB]",
      valueColor: "text-[#2563EB]",
    },
    {
      label: "완료된 과제",
      value: `${completedTaskCount} / ${totalTasks}`,
      helper: `과제 완료율 ${taskCompletionRate}%`,
      icon: CheckCircle2,
      iconBg: "bg-[#10B981]/10 text-[#10B981]",
      valueColor: "text-[#047857]",
    },
    {
      label: "진행 중 과제",
      value: `${inProgressTaskCount}건`,
      helper: `시작 전 ${notStartedTaskCount}건 대기`,
      icon: Clock,
      iconBg: "bg-[#2563EB]/10 text-[#2563EB]",
      valueColor: "text-[#1E293B]",
    },
    {
      label: "미해결 질문",
      value: `${unresolvedQuestionCount}건`,
      helper: `해결 완료 ${resolvedQuestionCount}건`,
      icon: HelpCircle,
      iconBg: "bg-slate-100 text-slate-600",
      valueColor: "text-[#1E293B]",
    },
  ];

  const statusBreakdown: StatusSummaryItem[] = [
    {
      status: "시작 전",
      count: notStartedTaskCount,
      percentage:
        totalTasks > 0
          ? Math.round((notStartedTaskCount / totalTasks) * 100)
          : 0,
      barClass: "bg-slate-400",
    },
    {
      status: "진행 중",
      count: inProgressTaskCount,
      percentage:
        totalTasks > 0
          ? Math.round((inProgressTaskCount / totalTasks) * 100)
          : 0,
      barClass: "bg-[#2563EB]",
    },
    {
      status: "완료",
      count: completedTaskCount,
      percentage:
        totalTasks > 0
          ? Math.round((completedTaskCount / totalTasks) * 100)
          : 0,
      barClass: "bg-[#10B981]",
    },
  ];

  const upcomingTaskEntries: UpcomingTaskEntry[] = tasks
    .filter((task) => task.status !== "완료")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .map((task) => ({
      task,
      courseTitle: getCourseTitleById(task.courseId),
    }));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              2026-2 학기 · 기준일 {TODAY_DATE}
            </span>
            <h2 className="mt-2.5 text-xl font-bold tracking-tight text-[#1E293B]">
              전체 학습 진행률 {averageProgress}%
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              총 {totalLessons}강 중{" "}
              <span className="font-semibold text-[#1E293B]">
                {completedLessons}강
              </span>
              을 완료했습니다. (진행 중 {activeCoursesCount}개 · 완료{" "}
              {completedCoursesCount}개)
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2">
              <span className="block text-slate-500">완료 차시</span>
              <span className="mt-0.5 block text-sm font-bold text-[#1E293B] tabular-nums">
                {completedLessons} / {totalLessons}강
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2">
              <span className="block text-slate-500">수강 완료 과목</span>
              <span className="mt-0.5 block text-sm font-bold text-[#047857] tabular-nums">
                {completedCoursesCount} / {courses.length}과목
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar
            value={averageProgress}
            label="전체 과목 평균 진도율"
            size="lg"
          />
        </div>
      </section>

      <section
        aria-label="핵심 학습 지표"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {kpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-slate-500">
                  {card.label}
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p
                className={`mt-3 text-2xl font-bold tracking-tight tabular-nums ${card.valueColor}`}
              >
                {card.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{card.helper}</p>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section
          aria-labelledby="course-progress-heading"
          className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-7"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2
                id="course-progress-heading"
                className="text-base font-semibold text-[#1E293B]"
              >
                과목별 학습 진행률
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                과목을 선택해 강의 상세와 연결된 과제를 확인하세요.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              강의 목록
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="mt-4 space-y-3">
              {courses.map((course) => {
                const courseTasks = getTasksByCourseId(course.id);
                const pendingTasksCount = courseTasks.filter(
                  (task) => task.status !== "완료"
                ).length;
                const isCompleted = course.progress >= 100;

                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="group block rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 transition hover:border-[#2563EB]/40 hover:bg-white hover:shadow-sm"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            isCompleted
                              ? "bg-[#10B981]/10 text-[#10B981]"
                              : "bg-[#2563EB]/10 text-[#2563EB]"
                          }`}
                          aria-hidden="true"
                        >
                          <BookOpen className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-[#1E293B] transition group-hover:text-[#2563EB]">
                            {course.title}
                          </h3>
                          <p className="truncate text-xs text-slate-500">
                            {course.instructor} · {course.semester}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#2563EB]"
                        aria-hidden="true"
                      />
                    </div>

                    <ProgressBar
                      value={course.progress}
                      label={`${course.completedLessons}/${course.totalLessons}강 완료`}
                      size="md"
                    />

                    <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        미완료 과제{" "}
                        <strong className="font-semibold text-[#1E293B]">
                          {pendingTasksCount}건
                        </strong>
                      </span>
                      <span>전체 과제 {courseTasks.length}건</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-[#F8FAFC] px-4 py-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                수강 중인 강의가 없습니다.
              </p>
            </div>
          )}
        </section>

        <section
          aria-labelledby="task-status-summary-heading"
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 xl:col-span-5"
        >
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2
                  id="task-status-summary-heading"
                  className="text-base font-semibold text-[#1E293B]"
                >
                  과제 상태 요약
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  전체 과제 {totalTasks}건의 진행 상태 분포입니다.
                </p>
              </div>
              <Link
                href="/tasks"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
              >
                과제 관리
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5">
              <div
                className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100"
                role="img"
                aria-label={`과제 상태 분포: 시작 전 ${notStartedTaskCount}건, 진행 중 ${inProgressTaskCount}건, 완료 ${completedTaskCount}건`}
              >
                {statusBreakdown.map((item) =>
                  item.count > 0 ? (
                    <div
                      key={item.status}
                      className={`h-full ${item.barClass}`}
                      style={{
                        width: `${(item.count / Math.max(totalTasks, 1)) * 100}%`,
                      }}
                    />
                  ) : null
                )}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {statusBreakdown.map((item) => (
                <div
                  key={item.status}
                  className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge status={item.status} />
                    <div className="flex items-baseline gap-1.5 tabular-nums">
                      <span className="text-sm font-bold text-[#1E293B]">
                        {item.count}건
                      </span>
                      <span className="text-xs text-slate-500">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
                    <div
                      className={`h-full rounded-full ${item.barClass}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#1E293B]">
                학습 질문 현황
              </span>
              <Link
                href="/questions"
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
              >
                질문 보기
              </Link>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              미해결 질문{" "}
              <strong className="font-semibold text-[#1E293B]">
                {unresolvedQuestionCount}건
              </strong>{" "}
              · 해결 완료{" "}
              <strong className="font-semibold text-[#047857]">
                {resolvedQuestionCount}건
              </strong>
            </p>
          </div>
        </section>
      </div>

      <UpcomingTasksPanel entries={upcomingTaskEntries} />
    </div>
  );
}
