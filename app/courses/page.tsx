import type { Metadata } from "next";
import { BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import {
  CourseListView,
  type CourseWithCounts,
} from "@/components/courses/CourseListView";
import {
  courses,
  getQuestionsByCourseId,
  getTasksByCourseId,
} from "@/data";

export const metadata: Metadata = {
  title: "Courses | StudyFlow",
  description: "수강 중인 강의 목록과 과목별 학습 진행률을 확인합니다.",
};

export default function CoursesPage() {
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (course) => course.progress >= 100
  ).length;
  const averageProgress =
    totalCourses > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + course.progress, 0) /
            totalCourses
        )
      : 0;

  const courseItems: CourseWithCounts[] = courses.map((course) => ({
    course,
    taskCount: getTasksByCourseId(course.id).length,
    questionCount: getQuestionsByCourseId(course.id).length,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section
        aria-label="강의 요약 지표"
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">총 수강 강의</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#1E293B]">
              {totalCourses}
              <span className="ml-1 text-sm font-medium text-slate-500">
                과목
              </span>
            </p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]"
            aria-hidden="true"
          >
            <BookOpen className="h-5 w-5" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">평균 진행률</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#2563EB]">
              {averageProgress}%
            </p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]"
            aria-hidden="true"
          >
            <TrendingUp className="h-5 w-5" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-medium text-slate-500">완료 강의</p>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-[#047857]">
              {completedCourses}
              <span className="ml-1 text-sm font-medium text-slate-500">
                과목
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

      <CourseListView items={courseItems} />
    </div>
  );
}
