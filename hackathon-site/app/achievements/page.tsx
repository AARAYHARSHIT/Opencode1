"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { MobileHeader, PageContainer, MobileNav } from "@/components/ui/mobile-nav";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getChallengeData } from "@/lib/data";
import type { Achievement } from "@/lib/types";

const variant = "default";

const additionalAchievements: Achievement[] = [
  { id: "night-owl", title: "Night Owl", description: "Submit a task after midnight", icon: "🦉", progress: 0, target: 1, category: "special" },
  { id: "speed-demon", title: "Speed Demon", description: "Complete a task in under 15 minutes", icon: "⚡", progress: 0, target: 1, category: "special" },
  { id: "social-butterfly", title: "Social Butterfly", description: "Share 10 LinkedIn posts", icon: "🦋", progress: 6, target: 10, category: "special" },
  { id: "full-stack", title: "Full Stack Explorer", description: "Complete tasks in 5 different categories", icon: "🌐", progress: 3, target: 5, category: "completion" },
  { id: "perfect-week", title: "Perfect Week", description: "Complete 7 days without missing any", icon: "✨", progress: 2, target: 7, category: "streak" },
  { id: "code-warrior", title: "Code Warrior", description: "Complete 10 hard-difficulty tasks", icon: "⚔️", progress: 4, target: 10, category: "completion" },
  { id: "mentor", title: "Mentor Mode", description: "Help 5 other participants", icon: "🎓", progress: 1, target: 5, category: "special" },
  { id: "marathon", title: "Marathon Runner", description: "Maintain a 30-day streak", icon: "🏃", progress: 7, target: 30, category: "streak" },
  { id: "xp-machine", title: "XP Machine", description: "Earn 5000 total XP", icon: "💎", progress: 2840, target: 5000, category: "xp" },
  { id: "level-5", title: "High Achiever", description: "Reach Level 5", icon: "🏆", progress: 3, target: 5, category: "xp" },
  { id: "consistency", title: "Consistency King", description: "Submit before noon for 10 days", icon: "👑", progress: 8, target: 10, category: "special" },
  { id: "weekend-warrior", title: "Weekend Warrior", description: "Complete tasks on 4 consecutive weekends", icon: "🔥", progress: 1, target: 4, category: "streak" },
];

type CategoryFilter = "all" | "streak" | "completion" | "xp" | "special";

const categoryLabels: Record<CategoryFilter, string> = {
  all: "All",
  streak: "Streaks",
  completion: "Completion",
  xp: "Experience",
  special: "Special",
};

function AchievementsContent() {
  const challengeData = getChallengeData(variant);
  const allAchievements = [...challengeData.achievements, ...additionalAchievements];
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredAchievements = activeCategory === "all"
    ? allAchievements
    : allAchievements.filter((a) => a.category === activeCategory as Achievement["category"]);

  const unlockedCount = allAchievements.filter((a) => a.unlockedAt).length;
  const totalCount = allAchievements.length;

  return (
    <div className="min-h-screen">
      <MobileHeader
        title="Achievements"
        subtitle={`${unlockedCount} of ${totalCount} unlocked`}
        showBack={true}
        backHref="/dashboard"
        showStreak={true}
      />

      <PageContainer>
        <div className="space-y-8">
          <ScrollReveal direction="up">
            <Card variant="elevated" padding="lg" className="relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-r from-palette-accent-400/20 to-palette-primary-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-palette-accent-400/30 to-palette-primary-500/30 border border-palette-accent-400/40 flex items-center justify-center shadow-glow-sm">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <div>
                    <h2 className="text-heading-xl font-bold text-palette-neutral-50">Achievement Progress</h2>
                    <p className="text-body-md text-palette-neutral-400">Track your milestones and unlock rewards</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress
                    value={unlockedCount}
                    max={totalCount}
                    size="md"
                    variant="primary"
                    showLabel
                    label={`${unlockedCount}/${totalCount} achievements unlocked`}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 xs:grid-cols-4 gap-3">
                  <div className="text-center p-3 glass rounded-xl">
                    <p className="text-heading-lg font-bold text-palette-accent-300">{unlockedCount}</p>
                    <p className="text-caption text-palette-neutral-500">Unlocked</p>
                  </div>
                  <div className="text-center p-3 glass rounded-xl">
                    <p className="text-heading-lg font-bold text-palette-neutral-300">{totalCount - unlockedCount}</p>
                    <p className="text-caption text-palette-neutral-500">Locked</p>
                  </div>
                  <div className="text-center p-3 glass rounded-xl">
                    <p className="text-heading-lg font-bold text-palette-primary-400">{Math.round((unlockedCount / totalCount) * 100)}%</p>
                    <p className="text-caption text-palette-neutral-500">Complete</p>
                  </div>
                  <div className="text-center p-3 glass rounded-xl">
                    <p className="text-heading-lg font-bold text-palette-green-400">
                      {allAchievements.filter((a) => a.progress === a.target && !a.unlockedAt).length}
                    </p>
                    <p className="text-caption text-palette-neutral-500">Ready to Claim</p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0"
                >
                  {categoryLabels[cat]}
                  {cat !== "all" && (
                    <span className="ml-1.5 text-caption">
                      {allAchievements.filter((a) => a.category === cat).length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <SectionHeader
              title={`${activeCategory === "all" ? "All" : categoryLabels[activeCategory]} Achievements`}
              variant="minimal"
              badge={<Badge variant="secondary">{filteredAchievements.length}</Badge>}
            />
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAchievements.map((achievement) => (
                <StaggerItem key={achievement.id}>
                  <Card
                    variant="elevated"
                    padding="md"
                    hover
                    className={`relative overflow-hidden ${achievement.unlockedAt ? "" : "opacity-70"}`}
                  >
                    {achievement.unlockedAt && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="success" size="sm">Unlocked</Badge>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                          achievement.unlockedAt
                            ? "bg-gradient-to-br from-palette-primary-500/30 to-palette-accent-400/30 border border-palette-primary-400/40 shadow-glow-sm"
                            : "bg-palette-neutral-800 border border-palette-neutral-700"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-body-md font-semibold text-palette-neutral-50 truncate">
                          {achievement.title}
                        </h4>
                        <p className="mt-1 text-body-sm text-palette-neutral-400 line-clamp-2">
                          {achievement.description}
                        </p>
                        <div className="mt-3">
                          <Progress
                            value={achievement.progress}
                            max={achievement.target}
                            size="sm"
                            variant={
                              achievement.progress >= achievement.target
                                ? "success"
                                : achievement.progress > 0
                                ? "primary"
                                : "default"
                            }
                          />
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="text-caption text-palette-neutral-500">
                              {achievement.progress}/{achievement.target}
                            </span>
                            <Badge variant="outline" size="sm" className="capitalize">
                              {achievement.category}
                            </Badge>
                          </div>
                        </div>
                        {achievement.unlockedAt && (
                          <p className="mt-2 text-caption text-palette-green-400 font-medium">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <ScrollReveal direction="up" delay={0.3} className="mt-4">
            <Card variant="elevated" padding="lg" className="relative overflow-hidden">
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-palette-primary-500/20 to-palette-accent-400/20 blur-3xl" />
              <div className="relative flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
                <div>
                  <p className="text-heading-md font-semibold text-palette-neutral-50">Keep earning!</p>
                  <p className="mt-1 text-body-md text-palette-neutral-400">
                    Complete more challenges and maintain streaks to unlock all achievements.
                  </p>
                </div>
                <Link href="/dashboard">
                  <Button size="lg" className="w-full xs:w-auto">
                    Back to Dashboard →
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

export default function AchievementsPage() {
  return <AchievementsContent />;
}
