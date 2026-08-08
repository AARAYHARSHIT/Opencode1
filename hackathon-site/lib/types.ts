export type DayStatus = "completed" | "missed" | "today" | "upcoming";

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalDays: number;
  completedDays: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
}

export interface DailyTask {
  id: string;
  day: number;
  title: string;
  description: string;
  xpReward: number;
  estimatedMinutes: number;
  category: "coding" | "reading" | "practice" | "reflection";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  completedAt?: string;
  submissionId?: string;
}

export interface Submission {
  id: string;
  day: number;
  taskId: string;
  content: string;
  submittedAt: string;
  status: "submitted" | "reviewed" | "accepted" | "rejected";
  feedback?: string;
  score?: number;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string;
  isActiveToday: boolean;
  freezeCount: number;
  maxFreezes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
  category: "streak" | "completion" | "xp" | "special";
}

export interface ChallengeTrack {
  id: string;
  title: string;
  description: string;
  totalDays: number;
  startDate: string;
  endDate: string;
  days: DailyTask[];
}

export interface ChallengeData {
  profile: StudentProfile;
  track: ChallengeTrack;
  submissions: Submission[];
  streak: StreakState;
  achievements: Achievement[];
}

export interface DayData {
  task: DailyTask;
  submission?: Submission;
  status: DayStatus;
  previousDay?: DayData;
  nextDay?: DayData;
}

export interface DashboardStats {
  completionPercentage: number;
  daysCompleted: number;
  daysTotal: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  todayStatus: DayStatus;
  upcomingTasks: DailyTask[];
}

export type DataVariant = "default" | "fresh" | "missed-day" | "empty-profile";

export interface MockDataSet {
  variant: DataVariant;
  data: ChallengeData;
}