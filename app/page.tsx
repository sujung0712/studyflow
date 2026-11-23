import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckSquare,
  HelpCircle,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { CourseCard, TaskItem } from "@/components";
import {
  TODAY_DATE,
  courses,
  getCourseTitleById,
  getQuestionsByCourseId,
  getTasksByCourseId,
  questions,
  tasks,
} from "@/data";

export default function HomePage() {
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

  const dueTodayTasks = tasks.filter(
    (task) => task.dueDate === TODAY_DATE && task.status !== "완료"
  );
  const activeCourses = courses.filter((course) => course.progress < 100);
  const unresolvedQuestions = questions.filter(
    (question) => question.status !== "완료"
  );

  const todayTasks = tasks
    .filter(
      (task) =>
        task.status !== "완료" &&
        (task.dueDate <= TODAY_DATE || task.status === "진행 중")
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const summaryCards = [
    {
      label: "전체 진행률",
      value: `${averageProgress}%`,
      helper: `${completedLessons}/${totalLessons}강 완료`,
      href: "/dashboard",
      icon: TrendingUp,
      iconBg: "bg-[#2563EB]/10 text-[#2563EB]",
      valueColor: "text-[#2563EB]",
    },
    {
      label: "오늘 마감 과제",
      value: `${dueTodayTasks.length}건`,
      helper: `기준일 ${TODAY_DATE}`,
      href: "/tasks",
      icon: CheckSquare,
      iconBg: "bg-[#2563EB]/10 text-[#2563EB]",
      valueColor: "text-[#1E293B]",
    },
    {
      label: "진행 중인 강의",
      value: `${activeCourses.length}개`,
      helper: `전체 ${courses.length}개 수강 중`,
      href: "/courses",
      icon: BookOpen,
      iconBg: "bg-[#10B981]/10 text-[#10B981]",
      valueColor: "text-[#1E293B]",
    },
    {
      label: "미해결 질문",
      value: `${unresolvedQuestions.length}건`,
      helper: `전체 ${questions.length}건 기록됨`,
      href: "/questions",
      icon: HelpCircle,
      iconBg: "bg-slate-100 text-slate-600",
      valueColor: "text-[#1E293B]",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-xs font-medium text-[#2563EB]">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{TODAY_DATE}</span>
              <span aria-hidden="true">·</span>
              <span>2026-2 학기</span>
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-[#1E293B]">
              오늘의 학습 요약
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              오늘 마감 과제 {dueTodayTasks.length}건, 진행 중인 강의{" "}
              {activeCourses.length}개, 미해결 질문{" "}
              {unresolvedQuestions.length}건을 확인하세요.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#1E293B] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
          >
            <LayoutDashboard className="h-4 w-4 text-[#2563EB]" />
            상세 대시보드
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.label}
                href={card.href}
                className="group rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 transition hover:border-[#2563EB]/40 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    {card.label}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg}`}
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
              </Link>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="today-tasks-heading"
        className="rounded-xl border border-slate-200 bg-white p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="today-tasks-heading"
                className="text-base font-semibold text-[#1E293B]"
              >
                오늘 할 일
              </h2>
              <span className="rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-xs font-semibold text-[#2563EB] tabular-nums">
                {todayTasks.length}건
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              오늘 마감·기한 경과 또는 현재 진행 중인 과제입니다.
            </p>
          </div>

          <Link
            href="/tasks"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
          >
            전체 과제 보기
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {todayTasks.length > 0 ? (
          <div className="mt-4 space-y-2.5">
            {todayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                courseTitle={getCourseTitleById(task.courseId)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-[#F8FAFC] px-4 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              오늘 예정된 과제가 없습니다.
            </p>
          </div>
        )}
      </section>

      <section
        aria-labelledby="active-courses-heading"
        className="rounded-xl border border-slate-200 bg-white p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="active-courses-heading"
                className="text-base font-semibold text-[#1E293B]"
              >
                진행 중인 강의
              </h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 tabular-nums">
                {activeCourses.length}개
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              현재 수강을 이어가고 있는 과목의 진행률입니다.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#2563EB] transition hover:text-[#1D4ED8]"
          >
            전체 강의 보기
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {activeCourses.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                taskCount={getTasksByCourseId(course.id).length}
                questionCount={getQuestionsByCourseId(course.id).length}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-[#F8FAFC] px-4 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              진행 중인 강의가 없습니다.
            </p>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-[#2563EB]/20 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]"
            aria-hidden="true"
          >
            <LayoutDashboard className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-[#1E293B]">
              전체 학습 지표를 한눈에 확인해 보세요
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              대시보드에서 과목별 진행률, 과제 상태 분포, 다가오는 일정을
              상세히 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          대시보드 이동
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
