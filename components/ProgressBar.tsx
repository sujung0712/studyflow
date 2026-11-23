export interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<ProgressBarProps["size"]>, string> = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  const isCompleted = clamped >= 100;
  const barColor = isCompleted ? "bg-[#10B981]" : "bg-[#2563EB]";
  const textColor = isCompleted ? "text-[#10B981]" : "text-[#2563EB]";

  return (
    <div className={`w-full ${className}`.trim()}>
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
          <span className="font-medium text-slate-600">
            {label ?? "학습 진행률"}
          </span>
          {showPercentage && (
            <span className={`font-semibold tabular-nums ${textColor}`}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-slate-100 ${SIZE_CLASSES[size]}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "학습 진행률"}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
