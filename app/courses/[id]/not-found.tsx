import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function CourseNotFound() {
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
