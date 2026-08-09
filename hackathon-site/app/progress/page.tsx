"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations";
import { MobileHeader, PageContainer } from "@/components/ui/mobile-nav";
import { FloatingActionButton, ContextualNav } from "@/components/ui/fab-nav";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress, StepProgress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StreakDisplay } from "@/components/ui/streak-display";
import {
  getDashboardStats,
  getTodayDayNumber,
  getStreakInfo,
  getTrack,
  getDailyTasks,
  isProfileEmpty,
} from "@/lib/data";

const variant = "default";

function ProgressContent() {
  const profileEmpty = isProfileEmpty(variant);
  const stats = getDashboardStats(variant);
  const streakInfo = getStreakInfo(variant);
  const track = getTrack(variant);
  const allTasks = getDailyTasks(variant);
  const todayDay = getTodayDayNumber(variant);

  if (profileEmpty) {
    return (
      <PageTransition>
        <div className="min-h-screen py-16 xs:py-24">
          <MobileHeader title="Progress" showStreak={false} showBack backHref="/dashboard" />
          <PageContainer>
            <Card variant="outlined" padding="lg" className="text-center py-12">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-palette-neutral-800 border border-palette-neutral-700 flex items-center justify-center">
                  <svg className="w-8 h-8 text-palette-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-heading-lg font-semibold text-palette-neutral-50">Currently No Progress</h2>
                <p className="text-body-md text-palette-neutral-400 max-w-md mx-auto">
                  Start your 60-day coding challenge to track your progress here.
                </p>
                <Link href="/dashboard">
                  <Button variant="primary" size="lg" className="mt-4">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </PageContainer>
          <FloatingActionButton />
          <ContextualNav />
        </div>
      </PageTransition>
    );
  }

  const upcomingTasks = allTasks.filter(
    (t) => !t.completed && t.day >= todayDay
  ).slice(0, 5);

  const missedTasks = allTasks.filter(
    (t) => !t.completed && t.day < todayDay
  ).slice(0, 5);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <MobileHeader
          title="Progress"
          subtitle={`Day ${todayDay} of ${stats.daysTotal}`}
          showStreak={true}
          showBack={true}
          backHref="/dashboard"
        />

        <PageContainer>
          <div className="space-y-8">
            <ScrollReveal direction="up">
              <div className="grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
                <Card variant="elevated" padding="lg" hover className="relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-palette-primary-500/15 blur-2xl" />
                  <div className="relative">
                    <p className="text-caption text-palette-neutral-500 font-medium uppercase tracking-wider">Completion</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <AnimatedCounter value={stats.completionPercentage} suffix="%" className="text-display-sm font-bold text-gradient" />
                      <span className="text-body-sm text-palette-neutral-500">{stats.daysCompleted}/{stats.daysTotal} days</span>
                    </div>
                    <Progress
                      value={stats.completionPercentage}
                      max={100}
                      size="sm"
                      variant="success"
                      className="mt-3"
                    />
                  </div>
                </Card>

                <Card variant="elevated" padding="lg" hover className="relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-palette-secondary-500/15 blur-2xl" />
                  <div className="relative">
                    <p className="text-caption text-palette-neutral-500 font-medium uppercase tracking-wider">Total XP</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <AnimatedCounter value={stats.totalXP} className="text-display-sm font-bold text-gradient" />
                      <Badge variant="primary" size="sm">Level {stats.level}</Badge>
                    </div>
                    <Progress
                      value={stats.xpToNextLevel > 0 ? 1000 - stats.xpToNextLevel : 0}
                      max={1000}
                      size="sm"
                      variant="primary"
                      className="mt-3"
                    />
                    <p className="mt-2 text-caption text-palette-neutral-500">
                      {Math.max(0, stats.xpToNextLevel)} XP to Level {stats.level + 1}
                    </p>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg" hover className="relative overflow-hidden xs:col-span-2 lg:col-span-1">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-palette-accent-400/15 blur-2xl" />
                  <div className="relative">
                    <p className="text-caption text-palette-neutral-500 font-medium uppercase tracking-wider">Streak</p>
                    <div className="mt-2">
                      <StreakDisplay
                        current={streakInfo.current}
                        longest={streakInfo.longest}
                        isActiveToday={streakInfo.isActiveToday}
                        freezeCount={streakInfo.freezeCount}
                        maxFreezes={streakInfo.maxFreezes}
                        size="lg"
                        variant="compact"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <SectionHeader
                title="60-Day Journey"
                variant="minimal"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <Card variant="outlined" padding="lg">
                <StepProgress
                  currentStep={Math.min(stats.daysCompleted + 1, track.totalDays)}
                  steps={[
                    { label: "Week 1", description: "Days 1-7: Foundations", completed: stats.daysCompleted >= 7 },
                    { label: "Week 2", description: "Days 8-14: React Basics", completed: stats.daysCompleted >= 14, current: stats.daysCompleted >= 7 && stats.daysCompleted < 14 },
                    { label: "Week 3", description: "Days 15-21: Advanced React", current: stats.daysCompleted >= 14 && stats.daysCompleted < 21 },
                    { label: "Week 4", description: "Days 22-28: Full Stack", current: stats.daysCompleted >= 21 && stats.daysCompleted < 28 },
                    { label: "Week 5", description: "Days 29-35: Testing & Deploy", current: stats.daysCompleted >= 28 && stats.daysCompleted < 35 },
                    { label: "Week 6", description: "Days 36-42: Performance", current: stats.daysCompleted >= 35 && stats.daysCompleted < 42 },
                    { label: "Week 7", description: "Days 43-49: Architecture", current: stats.daysCompleted >= 42 && stats.daysCompleted < 49 },
                    { label: "Week 8", description: "Days 50-56: Specialization", current: stats.daysCompleted >= 49 && stats.daysCompleted < 56 },
                    { label: "Week 9", description: "Days 57-60: Capstone", current: stats.daysCompleted >= 56 },
                  ]}
                  direction="vertical"
                />
              </Card>
            </ScrollReveal>

            {missedTasks.length > 0 && (
              <ScrollReveal direction="up" delay={0.2}>
                <SectionHeader
                  title="Missed Tasks"
                  variant="minimal"
                  badge={<Badge variant="warning">{missedTasks.length} remaining</Badge>}
                />
                <Card variant="outlined" padding="lg" className="mt-4">
                  <div className="space-y-3">
                    {missedTasks.map((task) => (
                      <Link key={task.day} href={`/day/${task.day}`} className="block">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-palette-neutral-800/50 hover:bg-palette-neutral-800 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-palette-neutral-700 flex items-center justify-center flex-shrink-0">
                              <span className="text-body-sm font-bold text-palette-neutral-300 font-mono">D{task.day}</span>
                            </div>
                            <div>
                              <p className="text-body-sm font-medium text-palette-neutral-200">{task.title}</p>
                              <p className="text-caption text-palette-neutral-500">{task.category} &middot; {task.estimatedMinutes} min</p>
                            </div>
                          </div>
                          <Badge variant="outline" size="sm">+{task.xpReward} XP</Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {upcomingTasks.length > 0 && (
              <ScrollReveal direction="up" delay={0.25}>
                <SectionHeader
                  title="Upcoming Tasks"
                  variant="minimal"
                  badge={<Badge variant="primary">Next up</Badge>}
                />
                <Card variant="outlined" padding="lg" className="mt-4">
                  <div className="space-y-3">
                    {upcomingTasks.map((task) => (
                      <Link key={task.day} href={`/day/${task.day}`} className="block">
                        <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          task.day === todayDay
                            ? "bg-palette-primary-500/10 border border-palette-primary-500/30"
                            : "bg-palette-neutral-800/50 hover:bg-palette-neutral-800"
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              task.day === todayDay
                                ? "bg-gradient-to-br from-palette-primary-500 to-palette-secondary-400"
                                : "bg-palette-neutral-700"
                            }`}>
                              <span className={`text-body-sm font-bold font-mono ${
                                task.day === todayDay ? "text-white" : "text-palette-neutral-300"
                              }`}>D{task.day}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-body-sm font-medium text-palette-neutral-200">{task.title}</p>
                                {task.day === todayDay && <Badge variant="primary" size="sm">Today</Badge>}
                              </div>
                              <p className="text-caption text-palette-neutral-500">{task.category} &middot; {task.estimatedMinutes} min</p>
                            </div>
                          </div>
                          <Badge variant="outline" size="sm">+{task.xpReward} XP</Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {missedTasks.length === 0 && upcomingTasks.length === 0 && (
              <ScrollReveal direction="up" delay={0.2}>
                <Card variant="outlined" padding="lg" className="text-center py-8">
                  <div className="space-y-2">
                    <p className="text-body-md text-palette-neutral-300">All tasks completed!</p>
                    <p className="text-body-sm text-palette-neutral-500">You&apos;ve finished all available tasks.</p>
                  </div>
                </Card>
              </ScrollReveal>
            )}

            <ScrollReveal direction="up" delay={0.3} className="mt-4">
              <Link href="/dashboard" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Return to Dashboard
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </PageContainer>

        <FloatingActionButton />
        <ContextualNav />
      </div>
    </PageTransition>
  );
}

export default function ProgressPage() {
  return <ProgressContent />;
}
