import {
  getStreakInfo,
  getTodayDayNumber,
  getCompletionPercentage,
  isProfileEmpty,
  getTrack,
  getDayStatus,
} from "@/lib/data";
import type { DataVariant } from "@/lib/types";

export type CoachContext = {
  currentStreak: number;
  longestStreak: number;
  isActiveToday: boolean;
  missedDay: boolean;
  todayStatus: "completed" | "missed" | "today" | "upcoming";
  dayNumber: number;
  totalDays: number;
  completionPercentage: number;
  profileComplete: boolean;
};

export type CoachMessage = {
  type: "motivation" | "recovery" | "celebration" | "guidance" | "welcome";
  title: string;
  message: string;
  action?: string;
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

const WELCOME: CoachMessage[] = [
  { type: "welcome", title: "Welcome to ABTalks", message: "60 days. Daily commits. Daily posts. One transformed developer. Ready to start?", action: "Begin challenge" },
  { type: "welcome", title: "Your journey starts today", message: "No perfect timing. Just day one. Create your profile and claim your first task.", action: "Create profile" },
  { type: "welcome", title: "Join 1000+ builders", message: "Daily proof of work. Public accountability. Real growth. This is your cohort.", action: "See how it works" },
];

const RECOVERY: CoachMessage[] = [
  { type: "recovery", title: "Missed a day? Reset, don't quit.", message: "One missed day doesn't erase your progress. You've done this before. Day 1 starts now.", action: "Start fresh today" },
  { type: "recovery", title: "Streaks break. Habits stay.", message: "Your best streak is still yours. You can build another. Begin again today.", action: "Begin again" },
  { type: "recovery", title: "The comeback > the setback", message: "Today is a new chance. No guilt, just action. What's the next small step?", action: "Do today's task" },
];

const MOTIVATION: CoachMessage[] = [
  { type: "motivation", title: "Keep the momentum!", message: "You're building something amazing, one day at a time.", action: "Continue today's task" },
  { type: "motivation", title: "Consistency compounds", message: "Small daily progress beats occasional heroics. You're proving it.", action: "View progress" },
  { type: "motivation", title: "Leveling up silently", message: "Every commit, every post, every day — you're becoming the developer you envisioned.", action: "See your stats" },
];

const CELEBRATION: CoachMessage[] = [
  { type: "celebration", title: "On fire!", message: "Consecutive days of showing up. This is how careers are built.", action: "Keep going" },
  { type: "celebration", title: "New personal best!", message: "You just hit your longest streak yet. Momentum is on your side.", action: "Keep going" },
  { type: "celebration", title: "Milestone unlocked", message: "Days of consistency. You're not just coding; you're building a reputation.", action: "View achievements" },
];

const GUIDANCE: CoachMessage[] = [
  { type: "guidance", title: "Today's focus", message: "Estimated time to complete. Commit your code, post your progress. That's the proof.", action: "Open task" },
  { type: "guidance", title: "Proof of work = GitHub + LinkedIn", message: "A commit shows you built it. A post shows you own it. Both matter.", action: "Learn more" },
  { type: "guidance", title: "Days remaining", message: "You're making progress. The middle is where most quit. Not you.", action: "See timeline" },
];

export function generateCoachMessage(ctx: CoachContext): CoachMessage {
  const seed = hashString(`${ctx.currentStreak}-${ctx.dayNumber}-${ctx.todayStatus}-${ctx.completionPercentage}`);

  if (!ctx.profileComplete) {
    return pick(WELCOME, seed);
  }

  if (ctx.missedDay && ctx.todayStatus !== "completed") {
    return pick(RECOVERY, seed + 1);
  }

  if (ctx.currentStreak > 0 && ctx.currentStreak >= ctx.longestStreak && ctx.isActiveToday) {
    return pick(CELEBRATION, seed + 2);
  }

  if (ctx.currentStreak > 0 && ctx.isActiveToday) {
    return pick(MOTIVATION, seed + 3);
  }

  if (ctx.dayNumber <= ctx.totalDays) {
    const msg = pick(GUIDANCE, seed + 4);
    const remaining = ctx.totalDays - ctx.dayNumber;
    return {
      ...msg,
      title: `${remaining} days to go`,
      message: `You're ${ctx.completionPercentage}% through the challenge. The middle is where most quit. Not you.`,
    };
  }

  return pick(MOTIVATION, seed + 5);
}

export function getCoachContext(variant: DataVariant = "default"): CoachContext {
  const streak = getStreakInfo(variant);
  const todayDay = getTodayDayNumber(variant);
  const completion = getCompletionPercentage(variant);
  const profileEmpty = isProfileEmpty(variant);
  const track = getTrack(variant);
  const todayStatus = getDayStatus(todayDay, variant);

  return {
    currentStreak: streak.current,
    longestStreak: streak.longest,
    isActiveToday: streak.isActiveToday,
    missedDay: streak.current === 0 && streak.longest > 0,
    todayStatus,
    dayNumber: todayDay,
    totalDays: track.totalDays,
    completionPercentage: completion,
    profileComplete: !profileEmpty,
  };
}
