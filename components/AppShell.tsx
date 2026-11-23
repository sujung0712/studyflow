"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          isMenuOpen={isMobileMenuOpen}
          onMenuOpen={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
