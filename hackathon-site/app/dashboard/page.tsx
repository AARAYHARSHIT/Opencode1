"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations";
import { MobileHeader, PageContainer, MobileNav } from "@/components/ui/mobile-nav";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Progress, CircularProgress, StepProgress } from "@/components/ui/progress";
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

function DashboardContent() {
  const stats = getDashboardStats(variant);
  const streakInfo = getStreakInfo(variant);
  const daysWithStatus = getDaysWithStatus(variant);
  const todayTask = getTodayTask(variant);
  const track = getTrack(variant);
  const profileEmpty = isProfileEmpty(variant);

  const coachContext = getCoachContext(variant);
  const coachMessage = generateCoachMessage(coachContext);

  const [activeTab, setActiveTab] = useState<"overview" | "timeline">("overview");

  if (profileEmpty) {
    return (
      <div className="min-h-screen py-16 xs:py-24">
        <MobileHeader title="Dashboard" showStreak={false} />
        <PageContainer>
          <EmptyProfileState />
        </PageContainer>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <MobileHeader 
        title="Dashboard" 
        subtitle={`Day ${getTodayDayNumber(variant)} of ${stats.daysTotal}`}
        showStreak={true}
      />
      
      <PageContainer>
        <div className="space-y-8">
          <ScrollReveal direction="up">
            <div className="grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
              <Card variant="elevated" padding="lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-caption text-palette-neutral-500 dark:text-palette-neutral-400 font-medium uppercase tracking-wider">Current Streak</p>
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
                  <StreakFlame count={streakInfo.current} size="lg" />
                </div>
              </Card>

              <Card variant="elevated" padding="lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-caption text-palette-neutral-500 dark:text-palette-neutral-400 font-medium uppercase tracking-wider">Today&apos;s Status</p>
                    <StatusBadge status={stats.todayStatus} size="lg" />
                  </div>
                  <div className="w-16 h-16 xs:w-20 xs:h-20">
                    <CircularProgress 
                      value={stats.completionPercentage} 
                      size={64} 
                      strokeWidth={6}
                      variant="primary"
                      showLabel={false}
                    />
                  </div>
                </div>
              </Card>

              <Card variant="elevated" padding="lg">
                <p className="text-caption text-palette-neutral-500 dark:text-palette-neutral-400 font-medium uppercase tracking-wider">Total XP</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-display-sm font-bold text-palette-neutral-900 dark:text-palette-neutral-50 tabular-nums">{stats.totalXP.toLocaleString()}</span>
                  <Badge variant="primary" size="sm">Level {stats.level}</Badge>
                </div>
                <Progress 
                  value={stats.xpToNextLevel > 0 ? 1000 - stats.xpToNextLevel : 0} 
                  max={1000} 
                  size="sm" 
                  variant="primary"
                  className="mt-3"
                  showLabel
                  label={`${Math.max(0, stats.xpToNextLevel)} XP to Level ${stats.level + 1}`}
                />
              </Card>

              <Card variant="elevated" padding="lg">
                <p className="text-caption text-palette-neutral-500 dark:text-palette-neutral-400 font-medium uppercase tracking-wider">Completion</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-display-sm font-bold text-palette-neutral-900 dark:text-palette-neutral-50 tabular-nums">{stats.completionPercentage}%</span>
                  <span className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">{stats.daysCompleted}/{stats.daysTotal} days</span>
                </div>
                <Progress 
                  value={stats.completionPercentage} 
                  max={100} 
                  size="sm" 
                  variant="success"
                  className="mt-3"
                />
              </Card>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1} className="mt-4">
            <Card variant="outlined" padding="lg">
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 p-4 bg-palette-accent-50 dark:bg-palette-accent-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-palette-accent-100 dark:bg-palette-accent-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-palette-accent-600 dark:text-palette-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-palette-accent-700 dark:text-palette-accent-300">{coachMessage.title}</p>
                    <p className="text-body-sm text-palette-accent-600 dark:text-palette-accent-400">{coachMessage.message}</p>
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

          <ScrollReveal direction="up" delay={0.15}>
            <SectionHeader
              title="Today's Task"
              variant="minimal"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            {todayTask ? (
              <Card variant="interactive" padding="lg" className="group">
                <Link href={`/day/${todayTask.day}`} className="block">
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-palette-primary-100 dark:bg-palette-primary-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-heading-lg font-bold text-palette-primary-600 dark:text-palette-primary-400 font-mono">Day {todayTask.day}</span>
                      </div>
                      <div>
                        <h3 className="text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 group-hover:text-palette-primary-600 dark:group-hover:text-palette-primary-400 transition-colors">{todayTask.title}</h3>
                        <p className="mt-1 text-body-md text-palette-neutral-600 dark:text-palette-neutral-400 line-clamp-2">{todayTask.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">
                          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{todayTask.estimatedMinutes} min</span>
                          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>+{todayTask.xpReward} XP</span>
                          <Badge variant="outline" size="sm">{todayTask.category}</Badge>
                          <Badge variant="outline" size="sm">{todayTask.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 xs:hidden">
                      <svg className="w-6 h-6 text-palette-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Card>
            ) : (
              <Card variant="outlined" padding="lg">
                <div className="text-center py-8">
                  <p className="text-body-md text-palette-neutral-600 dark:text-palette-neutral-400">All tasks completed! 🎉</p>
                  <p className="mt-2 text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">Check back tomorrow for a new challenge.</p>
                </div>
              </Card>
            )}
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 mb-4">
              <SectionHeader
                title="60-Day Progress"
                variant="minimal"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
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
                      <tr className="border-b border-palette-neutral-200 dark:border-palette-neutral-700">
                        <th className="pb-3 text-caption font-medium text-palette-neutral-500 dark:text-palette-neutral-400 uppercase tracking-wider">Day</th>
                        <th className="pb-3 text-caption font-medium text-palette-neutral-500 dark:text-palette-neutral-400 uppercase tracking-wider hidden sm:table-cell">Title</th>
                        <th className="pb-3 text-caption font-medium text-palette-neutral-500 dark:text-palette-neutral-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                        <th className="pb-3 text-caption font-medium text-palette-neutral-500 dark:text-palette-neutral-400 uppercase tracking-wider">Status</th>
                        <th className="pb-3 text-caption font-medium text-palette-neutral-500 dark:text-palette-neutral-400 uppercase tracking-wider hidden lg:table-cell">XP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daysWithStatus.map(({ day, status }) => {
                        const task = track.days.find(d => d.day === day);
                        const isToday = day === getTodayDayNumber(variant);
                        return (
                          <tr key={day} className={`border-b border-palette-neutral-100 dark:border-palette-neutral-800 ${isToday ? "bg-palette-primary-50 dark:bg-palette-primary-950/20" : ""} transition-colors hover:bg-palette-neutral-50 dark:hover:bg-palette-neutral-900/50`}>
                            <td className="py-3 font-mono font-medium text-body-sm text-palette-neutral-900 dark:text-palette-neutral-50">
                              Day {day}
                              {isToday && <Badge variant="primary" size="sm" className="ml-2">Today</Badge>}
                            </td>
                            <td className="py-3 text-body-sm text-palette-neutral-700 dark:text-palette-neutral-300 hidden sm:table-cell max-w-xs truncate">
                              {task?.title || "—"}
                            </td>
                            <td className="py-3 hidden md:table-cell">
                              {task && <Badge variant="outline" size="sm">{task.category}</Badge>}
                            </td>
                            <td className="py-3">
                              <StatusBadge status={status} size="sm" />
                            </td>
                            <td className="py-3 text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400 font-mono hidden lg:table-cell">
                              {task ? `+${task.xpReward}` : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <SectionHeader
              title="Recent Achievements"
              variant="minimal"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getChallengeData(variant).achievements.slice(0, 6).map((achievement: { id: string; title: string; description: string; icon: string; unlockedAt?: string; progress: number; target: number }) => (
                <Card key={achievement.id} variant="outlined" padding="md" className={achievement.unlockedAt ? "" : "opacity-50"}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-palette-neutral-100 dark:bg-palette-neutral-800 flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-body-md font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 truncate">{achievement.title}</h4>
                      <p className="mt-1 text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400">{achievement.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={achievement.progress} max={achievement.target} size="sm" variant={achievement.unlockedAt ? "success" : "default"} />
                        <span className="text-caption font-mono text-palette-neutral-500 dark:text-palette-neutral-400">{achievement.progress}/{achievement.target}</span>
                      </div>
                      {achievement.unlockedAt && (
                        <p className="mt-2 text-caption text-palette-green-600 dark:text-palette-green-400 font-medium">Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4} className="mt-4">
            <Card variant="outlined" padding="lg">
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
                <div>
                  <p className="text-heading-md font-semibold text-palette-neutral-900 dark:text-palette-neutral-50">Keep the streak alive</p>
                  <p className="mt-1 text-body-md text-palette-neutral-600 dark:text-palette-neutral-400">Complete today&apos;s task before midnight to extend your streak to {streakInfo.current + 1} days.</p>
                </div>
                <Link href={`/day/${todayTask?.day || getTodayDayNumber(variant)}`}>
                  <Button size="lg" className="w-full xs:w-auto">
                    Continue Challenge →
                  </Button>
                </Link>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </PageContainer>
      
      <MobileNav />
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}