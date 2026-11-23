import type { StudyStatus } from "@/data/types";

export interface StatusBadgeProps {
  status: StudyStatus;
  className?: string;
}

const STATUS_STYLES: Record<
  StudyStatus,
  { container: string; dot: string }
> = {
  "시작 전": {
    container: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
  },
  "진행 중": {
    container: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20",
    dot: "bg-[#2563EB]",
  },
  완료: {
    container: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
    dot: "bg-[#10B981]",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles.container} ${className}`.trim()}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
