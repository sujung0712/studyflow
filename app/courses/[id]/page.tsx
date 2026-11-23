import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  HelpCircle,
  User,
} from "lucide-react";
import { ProgressBar, StatusBadge, TaskItem } from "@/components";
import {
  getCourseById,
  getQuestionsByCourseId,
  getTasksByCourseId,
} from "@/data";
import type { StudyStatus } from "@/data/types";

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseById(params.id);

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400"
            aria-hidden="true"
          >
            <BookOpen className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#1E293B]">
            강의를 찾을 수 없습니다.
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            요청하신 강의 정보가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            강의 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const courseTasks = [...getTasksByCourseId(course.id)].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );
  const courseQuestions = [...getQuestionsByCourseId(course.id)].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  const courseStatus: StudyStatus =
    course.progress >= 100
      ? "완료"
      : course.progress > 0
        ? "진행 중"
        : "시작 전";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <nav
        aria-label="경로 탐색"
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-[#2563EB]"
        >
          <ArrowLeft className="h-4 w-4" />
          강의 목록으로
        </Link>

        <ol className="flex items-center gap-1.5 text-xs text-slate-500">
          <li>
            <Link href="/courses" className="transition hover:text-[#2563EB]">
              Courses
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </li>
          <li className="font-semibold text-[#1E293B]" aria-current="page">
            {course.title}
          </li>
        </ol>
      </nav>

      <section
        aria-label="강의 기본 정보"
        className="rounded-xl border border-slate-200 bg-white p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {course.semester} 학기
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                <Award className="h-3.5 w-3.5 text-slate-400" />
                {course.credits}학점
              </span>
              <StatusBadge status={courseStatus} />
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#1E293B]">
              {course.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {course.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-slate-400" />
            {course.instructor}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400" />
            {course.schedule}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-slate-400" />
            {course.completedLessons} / {course.totalLessons}강 완료
          </span>
        </div>

        <div className="mt-5 rounded-lg bg-[#F8FAFC] p-4">
          <ProgressBar
            value={course.progress}
            label={`학습 진행률 (${course.completedLessons}/${course.totalLessons}강)`}
            size="lg"
          />
        </div>
      </section>

      <section aria-label="연결된 과제" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckSquare
              className="h-5 w-5 text-[#2563EB]"
              aria-hidden="true"
            />
            <h3 className="text-base font-bold text-[#1E293B]">연결된 과제</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">
              {courseTasks.length}
            </span>
          </div>
          <Link
            href="/tasks"
            className="text-xs font-semibold text-[#2563EB] transition hover:underline"
          >
            전체 과제 보기
          </Link>
        </div>

        {courseTasks.length > 0 ? (
          <div className="space-y-3">
            {courseTasks.map((task) => (
              <TaskItem key={task.id} task={task} showCourse={false} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              등록된 과제가 없습니다.
            </p>
          </div>
        )}
      </section>

      <section aria-label="연결된 질문" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle
              className="h-5 w-5 text-[#2563EB]"
              aria-hidden="true"
            />
            <h3 className="text-base font-bold text-[#1E293B]">연결된 질문</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">
              {courseQuestions.length}
            </span>
          </div>
          <Link
            href="/questions"
            className="text-xs font-semibold text-[#2563EB] transition hover:underline"
          >
            전체 질문 보기
          </Link>
        </div>

        {courseQuestions.length > 0 ? (
          <div className="space-y-3">
            {courseQuestions.map((question) => (
              <article
                key={question.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-[#1E293B]">
                      {question.title}
                    </h4>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {question.createdAt}
                    </p>
                  </div>
                  <StatusBadge status={question.status} />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {question.content}
                </p>

                {question.answer && (
                  <div className="mt-4 rounded-lg border border-[#10B981]/20 bg-[#10B981]/5 p-3.5">
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      답변 미리보기
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#1E293B]">
                      {question.answer}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              등록된 질문이 없습니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
