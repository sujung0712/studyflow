"use client";

import { useMemo, useState } from "react";
import { CheckSquare, RotateCcw } from "lucide-react";
import { TaskItem } from "@/components";
import type { Course, StudyStatus, Task } from "@/data/types";

export interface TaskListViewProps {
  tasks: Task[];
  courses: Course[];
}

type StatusFilter = "전체" | StudyStatus;

const STATUS_FILTERS: StatusFilter[] = ["전체", "시작 전", "진행 중", "완료"];

export function TaskListView({ tasks, courses }: TaskListViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("전체");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");

  const courseTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const course of courses) {
      map.set(course.id, course.title);
    }
    return map;
  }, [courses]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }, [tasks]);

  const courseFilteredTasks = useMemo(() => {
    if (selectedCourseId === "all") {
      return sortedTasks;
    }
    return sortedTasks.filter((task) => task.courseId === selectedCourseId);
  }, [sortedTasks, selectedCourseId]);

  const statusCounts = useMemo<Record<StatusFilter, number>>(() => {
    const counts: Record<StatusFilter, number> = {
      전체: courseFilteredTasks.length,
      "시작 전": 0,
      "진행 중": 0,
      완료: 0,
    };

    for (const task of courseFilteredTasks) {
      counts[task.status] += 1;
    }

    return counts;
  }, [courseFilteredTasks]);

  const filteredTasks = useMemo(() => {
    if (selectedStatus === "전체") {
      return courseFilteredTasks;
    }
    return courseFilteredTasks.filter((task) => task.status === selectedStatus);
  }, [courseFilteredTasks, selectedStatus]);

  const hasActiveFilter =
    selectedStatus !== "전체" || selectedCourseId !== "all";

  const handleResetFilters = () => {
    setSelectedStatus("전체");
    setSelectedCourseId("all");
  };

  return (
    <section aria-label="과제 목록">
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="과제 상태 필터"
        >
          {STATUS_FILTERS.map((status) => {
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedStatus(status)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "border-[#2563EB] bg-[#2563EB] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#1E293B]"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {statusCounts[status]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <label
            htmlFor="task-course-filter"
            className="text-xs font-medium text-slate-500"
          >
            강의 필터
          </label>
          <select
            id="task-course-filter"
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
            className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-sm font-medium text-[#1E293B] outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15"
          >
            <option value="all">전체 강의</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>마감일 빠른 순으로 정렬됩니다.</span>
        <span className="font-medium">
          총{" "}
          <strong className="font-semibold text-[#1E293B]">
            {filteredTasks.length}
          </strong>
          개 과제
        </span>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              courseTitle={courseTitleMap.get(task.courseId) ?? "미지정 강의"}
              showCourse={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400"
            aria-hidden="true"
          >
            <CheckSquare className="h-5 w-5" />
          </span>
          <p className="mt-3 text-sm font-semibold text-[#1E293B]">
            해당 조건의 과제가 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            상태 또는 강의 필터를 변경해 다른 과제를 확인해 보세요.
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              필터 초기화
            </button>
          )}
        </div>
      )}
    </section>
  );
}
