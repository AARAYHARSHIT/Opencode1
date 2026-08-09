import challengeData from "@/data/challenge.json";
import type {
  ChallengeData,
  DailyTask,
  Submission,
  StreakState,
  DayStatus,
  DayData,
  DashboardStats,
  DataVariant,
  MockDataSet,
} from "@/lib/types";

const typedChallengeData = challengeData as {
  variants: Array<{ variant: DataVariant; data: ChallengeData }>;
};

function getMockDataSet(variant: DataVariant = "default"): MockDataSet {
  const found = typedChallengeData.variants.find((v) => v.variant === variant);
  return found || typedChallengeData.variants[0];
}

export function getChallengeData(variant: DataVariant = "default"): ChallengeData {
  return getMockDataSet(variant).data;
}

export function getStudentProfile(variant: DataVariant = "default") {
  return getChallengeData(variant).profile;
}

export function getTrack(variant: DataVariant = "default") {
  return getChallengeData(variant).track;
}

export function getSubmissions(variant: DataVariant = "default") {
  return getChallengeData(variant).submissions;
}

export function getStreakState(variant: DataVariant = "default"): StreakState {
  return getChallengeData(variant).streak;
}

export function getAchievements(variant: DataVariant = "default") {
  return getChallengeData(variant).achievements;
}

export function getDailyTasks(variant: DataVariant = "default"): DailyTask[] {
  return getTrack(variant).days;
}

export function getTaskByDay(day: number, variant: DataVariant = "default"): DailyTask | undefined {
  return getDailyTasks(variant).find((task) => task.day === day);
}

export function getSubmissionByDay(day: number, variant: DataVariant = "default"): Submission | undefined {
  return getSubmissions(variant).find((sub) => sub.day === day);
}

export function getDayStatus(day: number, variant: DataVariant = "default"): DayStatus {
  const task = getTaskByDay(day, variant);
  const today = getTodayDayNumber(variant);
  
  if (!task) return "upcoming";
  if (task.completed) return "completed";
  if (day === today) return "today";
  if (day < today) return "missed";
  return "upcoming";
}

export function getTodayDayNumber(variant: DataVariant = "default"): number {
  const track = getTrack(variant);
  const startDate = new Date(track.startDate);
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(diffDays, track.totalDays));
}

export function getTodayTask(variant: DataVariant = "default"): DailyTask | undefined {
  const todayDay = getTodayDayNumber(variant);
  return getTaskByDay(todayDay, variant);
}

export function getDayData(day: number, variant: DataVariant = "default"): DayData {
  const task = getTaskByDay(day, variant);
  const submission = getSubmissionByDay(day, variant);
  const status = getDayStatus(day, variant);
  const track = getTrack(variant);
  
  const previousDay = day > 1 ? getDayData(day - 1, variant) : undefined;
  const nextDay = day < track.totalDays ? getDayData(day + 1, variant) : undefined;
  
  return {
    task: task!,
    submission,
    status,
    previousDay,
    nextDay,
  };
}

export function getCompletionPercentage(variant: DataVariant = "default"): number {
  const tasks = getDailyTasks(variant);
  const completed = tasks.filter((t) => t.completed).length;
  return tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
}

export function getDashboardStats(variant: DataVariant = "default"): DashboardStats {
  const profile = getStudentProfile(variant);
  const completionPercentage = getCompletionPercentage(variant);
  const todayStatus = getDayStatus(getTodayDayNumber(variant), variant);
  const upcomingTasks = getDailyTasks(variant)
    .filter((t) => !t.completed && t.day >= getTodayDayNumber(variant))
    .slice(0, 5);
  
  const xpToNextLevel = (profile.level * 1000) - profile.totalXP;
  
  return {
    completionPercentage,
    daysCompleted: profile.completedDays,
    daysTotal: profile.totalDays,
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    totalXP: profile.totalXP,
    level: profile.level,
    xpToNextLevel: Math.max(0, xpToNextLevel),
    todayStatus,
    upcomingTasks,
  };
}

export function getDaysWithStatus(variant: DataVariant = "default"): Array<{ day: number; status: DayStatus }> {
  const track = getTrack(variant);
  return track.days.map((task) => ({
    day: task.day,
    status: getDayStatus(task.day, variant),
  }));
}

export function getStreakInfo(variant: DataVariant = "default"): { current: number; longest: number; isActiveToday: boolean; freezeCount: number; maxFreezes: number } {
  const streak = getStreakState(variant);
  return {
    current: streak.current,
    longest: streak.longest,
    isActiveToday: streak.isActiveToday,
    freezeCount: streak.freezeCount,
    maxFreezes: streak.maxFreezes,
  };
}

export function isProfileEmpty(variant: DataVariant = "default"): boolean {
  const profile = getStudentProfile(variant);
  return !profile.name || !profile.email;
}

export function isTrackEmpty(variant: DataVariant = "default"): boolean {
  const track = getTrack(variant);
  return track.days.length === 0;
}

export function hasAnyData(variant: DataVariant = "default"): boolean {
  const profile = getStudentProfile(variant);
  const track = getTrack(variant);
  return !!(profile.name && track.days.length > 0);
}

export function getAvailableVariants(): DataVariant[] {
  return typedChallengeData.variants.map((v) => v.variant);
}

export { type ChallengeData, type DailyTask, type Submission, type StreakState, type DayStatus, type DayData, type DashboardStats, type DataVariant } from "@/lib/types";