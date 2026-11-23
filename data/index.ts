import rawMockData from "./mockData.json";
import type { Course, Question, StudyFlowData, Task } from "./types";

export type {
  Course,
  Question,
  StudyFlowData,
  StudyStatus,
  Task,
  TaskPriority,
} from "./types";

export const TODAY_DATE = "2026-11-23";

export const studyFlowData: StudyFlowData = rawMockData as StudyFlowData;

export const courses: Course[] = studyFlowData.courses;
export const tasks: Task[] = studyFlowData.tasks;
export const questions: Question[] = studyFlowData.questions;

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function getTasksByCourseId(courseId: string): Task[] {
  return tasks.filter((task) => task.courseId === courseId);
}

export function getQuestionsByCourseId(courseId: string): Question[] {
  return questions.filter((question) => question.courseId === courseId);
}

export function getCourseTitleById(courseId: string): string {
  return getCourseById(courseId)?.title ?? "미지정 강의";
}

function parseUtcDate(dateString: string): number {
  const [yearStr, monthStr, dayStr] = dateString.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return NaN;
  }

  return Date.UTC(year, month - 1, day);
}

export function getDueDateLabel(
  dueDate: string,
  referenceDate: string = TODAY_DATE
): string {
  const dueUtc = parseUtcDate(dueDate);
  const refUtc = parseUtcDate(referenceDate);

  if (Number.isNaN(dueUtc) || Number.isNaN(refUtc)) {
    return dueDate;
  }

  const diffDays = Math.round((dueUtc - refUtc) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "오늘 마감";
  }

  if (diffDays > 0) {
    return `마감 ${diffDays}일 전`;
  }

  return "마감 지남";
}
