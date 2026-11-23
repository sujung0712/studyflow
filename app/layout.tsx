import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header, Sidebar } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyFlow | 대학생 학습관리 대시보드",
  description:
    "대학생이 수강 중인 강의의 진행률, 과제, 학습 질문을 한곳에서 체계적으로 관리할 수 있는 학습관리 웹 애플리케이션입니다.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="bg-[#F8FAFC] text-[#1E293B] antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <main className="flex-1 bg-[#F8FAFC] p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
