export type StudyStatus = "시작 전" | "진행 중" | "완료";
export type TaskPriority = "높음" | "보통" | "낮음";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  semester: string;
  progress: number;
  description: string;
  credits: number;
  schedule: string;
  totalLessons: number;
  completedLessons: number;
}

export interface Task {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  status: StudyStatus;
  description: string;
  priority: TaskPriority;
}

export interface Question {
  id: string;
  courseId: string;
  title: string;
  content: string;
  status: StudyStatus;
  createdAt: string;
  answer?: string;
}

export interface StudyFlowData {
  courses: Course[];
  tasks: Task[];
  questions: Question[];
}
