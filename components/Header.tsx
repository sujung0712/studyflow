"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare } from "lucide-react";

interface HeaderMeta {
  title: string;
  subtitle: string;
}

function getHeaderMeta(pathname: string): HeaderMeta {
  if (pathname === "/") {
    return {
      title: "Home",
      subtitle: "오늘의 학습 요약과 다가오는 과제를 확인하세요.",
    };
  }
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return {
      title: "Dashboard",
      subtitle: "전체 학습 진행률과 핵심 지표를 한눈에 확인합니다.",
    };
  }
  if (pathname === "/courses") {
    return {
      title: "Courses",
      subtitle: "수강 중인 강의 목록과 과목별 진행률을 관리합니다.",
    };
  }
  if (pathname.startsWith("/courses/")) {
    return {
      title: "Course Detail",
      subtitle: "강의 상세 정보와 연결된 과제 및 질문을 확인합니다.",
    };
  }
  if (pathname === "/tasks") {
    return {
      title: "Tasks",
      subtitle: "과제 마감일과 진행 상태를 체계적으로 추적합니다.",
    };
  }
  if (pathname.startsWith("/tasks/")) {
    return {
      title: "Task Detail",
      subtitle: "과제 세부 내용과 제출 상태를 확인합니다.",
    };
  }
  if (pathname === "/questions" || pathname.startsWith("/questions/")) {
    return {
      title: "Questions",
      subtitle: "학습 중 기록한 질문과 해결 상태를 정리합니다.",
    };
  }

  return {
    title: "StudyFlow",
    subtitle: "대학생 학습관리 대시보드",
  };
}

export function Header() {
  const pathname = usePathname();
  const { title, subtitle } = getHeaderMeta(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight text-[#1E293B]">
          {title}
        </h1>
        <p className="truncate text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          <CheckSquare className="h-3.5 w-3.5" />
          과제 보기
        </Link>
      </div>
    </header>
  );
}
