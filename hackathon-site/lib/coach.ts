export type CoachContext = {
  currentStreak: number;
  longestStreak: number;
  isActiveToday: boolean;
  missedDay?: boolean;
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

function pickRandom<T>(array: T[], seed: number): T {
  return array[seed % array.length];
}

const MOTIVATION_MESSAGES = [
  { title: "Keep the momentum!", message: "You're building something amazing, one day at a time.", action: "Continue today's task" },
  { title: "Consistency compounds", message: "Small daily progress beats occasional heroics. You're proving it.", action: "View progress" },
  { title: "Streak protector active", message: "Your {streak}-day streak is a testament to your discipline. Guard it.", action: "Mark today complete" },
  { title: "Leveling up silently", message: "Every commit, every post, every day — you're becoming the developer you envisioned.", action: "See your stats" },
];

const RECOVERY_MESSAGES = [
  { title: "Missed a day? Reset, don't quit.", message: "One missed day doesn't erase your progress. Your {longest}-day best is still yours.", action: "Start fresh today" },
  { title: "Streaks break. Habits stay.", message: "You've done this before ({longest} days). You can do it again. Day 1 starts now.", action: "Begin again" },
  { title: "The comeback > the setback", message: "Today is a new chance. No guilt, just action. What's the next small step?", action: "Do today's task" },
];

const CELEBRATION_MESSAGES = [
  { title: "🔥 {streak} days strong!", message: "That's {streak} consecutive days of showing up. This is how careers are built.", action: "Share your streak" },
  { title: "New personal best!", message: "You just hit {streak} days — your longest streak yet. Momentum is on your side.", action: "Keep going" },
  { title: "Milestone unlocked", message: "{streak} days of consistency. You're not just coding; you're building a reputation.", action: "View achievements" },
];

const GUIDANCE_MESSAGES = [
  { title: "Today's focus: {taskTitle}", message: "Estimated {minutes} min. Commit your code, post your progress. That's the proof.", action: "Open task" },
  { title: "Proof of work = GitHub + LinkedIn", message: "A commit shows you built it. A post shows you own it. Both matter.", action: "Learn more" },
  { title: "{remaining} days to go", message: "You're {percentage}% through the challenge. The middle is where most quit. Not you.", action: "See timeline" },
];

const WELCOME_MESSAGES = [
  { title: "Welcome to ABTalks", message: "60 days. Daily commits. Daily posts. One transformed developer. Ready to start?", action: "Begin challenge" },
  { title: "Your journey starts today", message: "No perfect timing. Just day one. Set up your profile and claim your first task.", action: "Create profile" },
  { title: "Join 1000+ builders", message: "Daily proof of work. Public accountability. Real growth. This is your cohort.", action: "See how it works" },
];

export function generateCoachMessage(context: CoachContext): CoachMessage {
  const seedBase = `${context.currentStreak}-${context.dayNumber}-${context.todayStatus}-${context.completionPercentage}`;
  const seed = hashString(seedBase);
  
  if (!context.profileComplete) {
    const msg = pickRandom(WELCOME_MESSAGES, seed);
    return { ...msg, type: "welcome" };
  }
  
  if (context.missedDay && context.todayStatus === "today") {
    const msg = pickRandom(RECOVERY_MESSAGES, seed + 1);
    return { 
      ...msg, 
      type: "recovery",
      title: msg.title.replace("{longest}", String(context.longestStreak)),
      message: msg.message.replace("{longest}", String(context.longestStreak)),
    };
  }
  
  if (context.currentStreak > 0 && context.currentStreak >= context.longestStreak && context.isActiveToday) {
    const msg = pickRandom(CELEBRATION_MESSAGES, seed + 2);
    return {
      ...msg,
      type: "celebration",
      title: msg.title.replace("{streak}", String(context.currentStreak)),
      message: msg.message.replace("{streak}", String(context.currentStreak)),
    };
  }
  
  if (context.currentStreak > 0 && context.isActiveToday) {
    const msg = pickRandom(MOTIVATION_MESSAGES, seed + 3);
    return {
      ...msg,
      type: "motivation",
      title: msg.title.replace("{streak}", String(context.currentStreak)),
      message: msg.message.replace("{streak}", String(context.currentStreak)),
    };
  }
  
  if (context.dayNumber <= context.totalDays) {
    const msg = pickRandom(GUIDANCE_MESSAGES, seed + 4);
    return {
      ...msg,
      type: "guidance",
      title: msg.title
        .replace("{taskTitle}", "Today's Task")
        .replace("{minutes}", "30-90")
        .replace("{remaining}", String(context.totalDays - context.dayNumber))
        .replace("{percentage}", String(context.completionPercentage)),
      message: msg.message
        .replace("{minutes}", "30-90")
        .replace("{percentage}", String(context.completionPercentage)),
    };
  }
  
  const msg = pickRandom(MOTIVATION_MESSAGES, seed + 5);
  return { ...msg, type: "motivation" };
}

export function getCoachContext(variant: string = "default"): CoachContext {
  const { 
    getStudentProfile, 
    getStreakInfo, 
    getTodayDayNumber, 
    getTodayTask,
    getCompletionPercentage,
    isProfileEmpty 
  } = require("./data");
  
  const profile = getStudentProfile(variant as any);
  const streak = getStreakInfo(variant as any);
  const todayDay = getTodayDayNumber(variant as any);
  const todayTask = getTodayTask(variant as any);
  const completion = getCompletionPercentage(variant as any);
  const profileEmpty = isProfileEmpty(variant as any);
  const track = require("./data").getTrack(variant as any);
  
  return {
    currentStreak: streak.current,
    longestStreak: streak.longest,
    isActiveToday: streak.isActiveToday,
    missedDay: streak.current === 0 && streak.longest > 0,
    todayStatus: require("./data").getDayStatus(todayDay, variant as any),
    dayNumber: todayDay,
    totalDays: track.totalDays,
    completionPercentage: completion,
    profileComplete: !profileEmpty,
  };
}