"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CheckSquare,
  GraduationCap,
  HelpCircle,
  Home,
  LayoutDashboard,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Home;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Questions", href: "/questions", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-base font-bold tracking-tight text-[#1E293B]">
              StudyFlow
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              학습관리 대시보드
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="주요 메뉴">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-[#2563EB]/10 font-semibold text-[#2563EB]"
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-[#1E293B]"
              }`}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#2563EB]"
                  aria-hidden="true"
                />
              )}
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-[#2563EB]" : "text-slate-400"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1E293B]">
              2026-2 학기
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
                aria-hidden="true"
              />
              진행 중
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            수강 과목·과제·질문 통합 관리
          </p>
        </div>
      </div>
    </aside>
  );
}
