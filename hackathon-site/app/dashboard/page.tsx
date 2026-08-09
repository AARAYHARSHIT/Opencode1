"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/animations";
import { MobileHeader, PageContainer } from "@/components/ui/mobile-nav";
import { FloatingActionButton, ContextualNav } from "@/components/ui/fab-nav";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Progress, StepProgress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StreakFlame, StreakDisplay } from "@/components/ui/streak-display";
import { EmptyProfileState } from "@/components/ui/empty-state";
import {
  getChallengeData,
  getDashboardStats,
  getDaysWithStatus,
  getTodayTask,
  getTodayDayNumber,
  getStreakInfo,
  isProfileEmpty,
  getTrack
} from "@/lib/data";
import { generateCoachMessage, getCoachContext } from "@/lib/coach";

const variant = "default";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  const stats = getDashboardStats(variant);
  const streakInfo = getStreakInfo(variant);
  const daysWithStatus = getDaysWithStatus(variant);
  const todayTask = getTodayTask(variant);
  const track = getTrack(variant);
  const profileEmpty = isProfileEmpty(variant);

  const coachContext = getCoachContext(variant);
  const coachMessage = generateCoachMessage(coachContext);

  const [activeTab, setActiveTab] = useState<"overview" | "timeline">("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (profileEmpty) {
    return (
      <PageTransition>
        <div className="min-h-screen py-16 xs:py-24">
          <MobileHeader title="Dashboard" showStreak={false} />
          <PageContainer>
            <EmptyProfileState />
          </PageContainer>
          <FloatingActionButton />
          <ContextualNav />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        <MobileHeader
          title="Dashboard"
          subtitle={`Day ${getTodayDayNumber(variant)} of ${stats.daysTotal}`}
          showStreak={true}
          showBack={true}
          backHref="/"
        />

        <PageContainer>
          <div className="space-y-6 lg:space-y-8">
            {/* Hero Section - Premium First Impression */}
            <ScrollReveal direction="up">
              <div className="relative overflow-hidden rounded-3xl glass-strong border border-white/[0.08] p-6 xs:p-8 lg:p-10">
                {/* Background glow effects */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-palette-primary-500/20 to-palette-accent-400/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-palette-secondary-500/15 to-palette-primary-500/10 blur-3xl" />

                <div className="relative">
                  {/* Personalized Greeting */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <p className="text-body-lg text-palette-neutral-400">{getGreeting()}, Developer</p>
                    <h1 className="mt-1 text-heading-xl xs:text-heading-2xl font-bold text-palette-neutral-50">
                      Day <span className="text-gradient">{getTodayDayNumber(variant)}</span> of your journey
                    </h1>
                  </motion.div>

                  {/* Main Hero Content - Streak + Progress Ring */}
                  <div className="mt-6 flex flex-col xs:flex-row items-start xs:items-center gap-6">
                    {/* Animated Streak Indicator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={mounted ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                      className="flex items-center gap-4"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-2xl bg-gradient-to-br from-palette-accent-400/20 to-palette-primary-500/20 border border-palette-accent-400/30 flex items-center justify-center">
                          <StreakFlame count={streakInfo.current} size="lg" />
                        </div>
                        {streakInfo.isActiveToday && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-palette-green-400 rounded-full border-2 border-palette-neutral-900"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <AnimatedCounter
                            value={streakInfo.current}
                            className="text-display-lg xs:text-display-xl font-bold text-gradient"
                          />
                          <span className="text-body-md text-palette-neutral-400">day streak</span>
                        </div>
                        <p className="text-caption text-palette-neutral-500 mt-0.5">
                          {streakInfo.isActiveToday ? "Active today" : "Complete today's task to keep it going"}
                        </p>
                      </div>
                    </motion.div>

                    {/* Progress Ring */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={mounted ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="hidden sm:block"
                    >
                      <ProgressRing
                        value={stats.completionPercentage}
                        max={100}
                        size={100}
                        strokeWidth={8}
                        variant="primary"
                        showLabel={true}
                        label="Complete"
                      />
                    </motion.div>
                  </div>

                  {/* Stats Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6 grid grid-cols-3 gap-4"
                  >
                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/[0.06]">
                      <AnimatedCounter
                        value={stats.totalXP}
                        className="text-heading-lg font-bold text-gradient"
                      />
                      <p className="text-caption text-palette-neutral-500 mt-1">Total XP</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/[0.06]">
                      <AnimatedCounter
                        value={stats.daysCompleted}
                        className="text-heading-lg font-bold text-palette-neutral-50"
                      />
                      <p className="text-caption text-palette-neutral-500 mt-1">Days Done</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/[0.06]">
                      <AnimatedCounter
                        value={stats.completionPercentage}
                        suffix="%"
                        className="text-heading-lg font-bold text-palette-green-400"
                      />
                      <p className="text-caption text-palette-neutral-500 mt-1">Progress</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>

            {/* Coach Message */}
            <ScrollReveal direction="up" delay={0.1}>
              <Card variant="elevated" padding="md">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 p-4 bg-palette-accent-400/10 border border-palette-accent-400/30 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-palette-accent-400/15 border border-palette-accent-400/30 flex items-center justify-center flex-shrink-0"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-5 h-5 text-palette-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="text-body-sm font-semibold text-palette-accent-200">{coachMessage.title}</p>
                      <p className="text-body-sm text-palette-accent-300/80">{coachMessage.message}</p>
                    </div>
                  </div>
                  {coachMessage.action && (
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      {coachMessage.action}
                    </Button>
                  )}
                </div>
              </Card>
            </ScrollReveal>

            {/* Today's Focus Card */}
            <ScrollReveal direction="up" delay={0.15}>
              <SectionHeader
                title="Today's Focus"
                variant="minimal"
                badge={<Badge variant="primary" dot>Live</Badge>}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              {todayTask ? (
                <Card variant="interactive" padding="lg" hover className="group">
                  <Link href={`/day/${todayTask.day}`} className="block">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-palette-primary-500 to-palette-secondary-400 shadow-glow-sm flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <span className="text-heading-lg font-bold text-white font-mono">Day {todayTask.day}</span>
                        </motion.div>
                        <div>
                          <h3 className="text-heading-lg font-semibold text-palette-neutral-50 group-hover:text-palette-primary-300 transition-colors">{todayTask.title}</h3>
                          <p className="mt-1 text-body-md text-palette-neutral-400 line-clamp-2">{todayTask.description}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-body-sm text-palette-neutral-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {todayTask.estimatedMinutes} min
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              +{todayTask.xpReward} XP
                            </span>
                            <Badge variant="outline" size="sm">{todayTask.category}</Badge>
                            <Badge variant="outline" size="sm">{todayTask.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 xs:hidden">
                        <svg className="w-6 h-6 text-palette-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </Card>
              ) : (
                <Card variant="outlined" padding="lg" className="text-center py-8">
                  <div>
                    <p className="text-body-md text-palette-neutral-300">All tasks completed!</p>
                    <p className="mt-2 text-body-sm text-palette-neutral-500">Check back tomorrow for a new challenge.</p>
                  </div>
                </Card>
              )}
            </ScrollReveal>

            {/* 60-Day Progress */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 mb-4">
                <SectionHeader
                  title="60-Day Progress"
                  variant="minimal"
                />
                <div className="flex items-center gap-2 flex-shrink-0 glass rounded-lg p-1">
                  <Button
                    variant={activeTab === "overview" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "timeline" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("timeline")}
                  >
                    Timeline
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              {activeTab === "overview" ? (
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
              ) : (
                <Card variant="outlined" padding="lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-palette-neutral-800">
                          <th className="pb-3 text-caption font-medium text-palette-neutral-500 uppercase tracking-wider">Day</th>
                          <th className="pb-3 text-caption font-medium text-palette-neutral-500 uppercase tracking-wider hidden sm:table-cell">Title</th>
                          <th className="pb-3 text-caption font-medium text-palette-neutral-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                          <th className="pb-3 text-caption font-medium text-palette-neutral-500 uppercase tracking-wider">Status</th>
                          <th className="pb-3 text-caption font-medium text-palette-neutral-500 uppercase tracking-wider hidden lg:table-cell">XP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {daysWithStatus.map(({ day, status }) => {
                          const task = track.days.find(d => d.day === day);
                          const isToday = day === getTodayDayNumber(variant);
                          return (
                            <motion.tr
                              key={day}
                              className={`border-b border-palette-neutral-800/60 ${isToday ? "bg-palette-primary-500/10" : ""} transition-colors hover:bg-white/5`}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3 }}
                            >
                              <td className="py-3 font-mono font-medium text-body-sm text-palette-neutral-50">
                                Day {day}
                                {isToday && <Badge variant="primary" size="sm" className="ml-2">Today</Badge>}
                              </td>
                              <td className="py-3 text-body-sm text-palette-neutral-300 hidden sm:table-cell max-w-xs truncate">
                                {task?.title || "\u2014"}
                              </td>
                              <td className="py-3 hidden md:table-cell">
                                {task && <Badge variant="outline" size="sm">{task.category}</Badge>}
                              </td>
                              <td className="py-3">
                                <StatusBadge status={status} size="sm" />
                              </td>
                              <td className="py-3 text-body-sm text-palette-primary-400 font-mono hidden lg:table-cell">
                                {task ? `+${task.xpReward}` : "\u2014"}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </ScrollReveal>

            {/* Recent Achievements */}
            <ScrollReveal direction="up" delay={0.3}>
              <SectionHeader
                title="Recent Achievements"
                variant="minimal"
                badge={<Badge variant="secondary">Trophies</Badge>}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getChallengeData(variant).achievements.slice(0, 6).map((achievement: { id: string; title: string; description: string; icon: string; unlockedAt?: string; progress: number; target: number }) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card variant="elevated" padding="md" hover className={achievement.unlockedAt ? "" : "opacity-60"}>
                      <div className="flex items-start gap-3">
                        <motion.div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${achievement.unlockedAt ? "bg-gradient-to-br from-palette-primary-500/30 to-palette-accent-400/30 border border-palette-primary-400/40 shadow-glow-sm" : "bg-palette-neutral-800 border border-palette-neutral-700"} flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-body-md font-semibold text-palette-neutral-50 truncate">{achievement.title}</h4>
                          <p className="mt-1 text-body-sm text-palette-neutral-400">{achievement.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Progress value={achievement.progress} max={achievement.target} size="sm" variant={achievement.unlockedAt ? "success" : "default"} />
                            <span className="text-caption font-mono text-palette-neutral-500">{achievement.progress}/{achievement.target}</span>
                          </div>
                          {achievement.unlockedAt && (
                            <p className="mt-2 text-caption text-palette-green-400 font-medium">Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Keep Streak Alive CTA */}
            <ScrollReveal direction="up" delay={0.4} className="mt-4">
              <Card variant="elevated" padding="lg" className="relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-palette-primary-500/20 to-palette-accent-400/20 blur-3xl" />
                <div className="relative flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
                  <div>
                    <p className="text-heading-md font-semibold text-palette-neutral-50">Keep the streak alive</p>
                    <p className="mt-1 text-body-md text-palette-neutral-400">Complete today&apos;s task before midnight to extend your streak to {streakInfo.current + 1} days.</p>
                  </div>
                  <Link href={`/day/${todayTask?.day || getTodayDayNumber(variant)}`}>
                    <Button size="lg" className="w-full xs:w-auto">
                      Continue Challenge
                    </Button>
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </PageContainer>

        <FloatingActionButton />
        <ContextualNav />
      </div>
    </PageTransition>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
