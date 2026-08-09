"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { MobileHeader, PageContainer, MobileNav } from "@/components/ui/mobile-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getTrack,
  getTaskByDay,
  getSubmissionByDay,
  getDayStatus,
  getStreakInfo,
  getTodayDayNumber,
  getDashboardStats,
} from "@/lib/data";
import { generateCoachMessage, getCoachContext } from "@/lib/coach";
import type { DataVariant } from "@/lib/types";

const variant: DataVariant = "default";

const VALIDATORS = {
  github: (url: string) => {
    if (!url) return "GitHub URL is required";
    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes("github.com")) return "Must be a GitHub URL";
      if (parsed.pathname.split("/").filter(Boolean).length < 2) return "Must include owner/repo";
      return null;
    } catch {
      return "Invalid URL format";
    }
  },
  linkedin: (url: string) => {
    if (!url) return "LinkedIn post URL is required";
    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes("linkedin.com")) return "Must be a LinkedIn URL";
      if (!parsed.pathname.includes("/posts/")) return "Must be a LinkedIn post URL";
      return null;
    } catch {
      return "Invalid URL format";
    }
  },
};

function LockedDayView({ dayNumber, todayDay, coachMessage }: { dayNumber: number; todayDay: number; coachMessage: { title: string; message: string } }) {
  return (
    <div className="min-h-screen">
      <MobileHeader title={`Day ${dayNumber}`} showStreak={true} />
      <PageContainer>
        <ScrollReveal direction="up">
          <div className="mb-8">
            <span className="text-caption font-mono text-palette-neutral-500 dark:text-palette-neutral-400">Day {dayNumber} of 60</span>
            <Badge variant="outline" className="ml-3">Locked</Badge>
          </div>
          <h1 className="text-display-md font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 tracking-tight">Day {dayNumber}</h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <Card variant="outlined" padding="lg">
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-palette-neutral-100 dark:bg-palette-neutral-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-palette-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-heading-xl font-semibold text-palette-neutral-900 dark:text-palette-neutral-50">This day is locked</h2>
              <p className="mt-3 text-body-md text-palette-neutral-600 dark:text-palette-neutral-400 max-w-md mx-auto">
                Complete Day {todayDay} first. Challenges unlock sequentially.
              </p>
              <div className="mt-8">
                <Link href={`/day/${todayDay}`}>
                  <Button size="lg">Go to Today&apos;s Task (Day {todayDay}) →</Button>
                </Link>
              </div>
            </div>
          </Card>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.15}>
          <CoachCard coachMessage={coachMessage} />
        </ScrollReveal>
      </PageContainer>
      <MobileNav />
    </div>
  );
}

function CoachCard({ coachMessage }: { coachMessage: { title: string; message: string } }) {
  return (
    <Card variant="outlined" padding="lg" className="mt-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-palette-accent-100 dark:bg-palette-accent-900/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-palette-accent-600 dark:text-palette-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <p className="text-body-sm font-semibold text-palette-accent-700 dark:text-palette-accent-300">{coachMessage.title}</p>
          <p className="text-body-sm text-palette-accent-600 dark:text-palette-accent-400">{coachMessage.message}</p>
        </div>
      </div>
    </Card>
  );
}

function SubmissionForm({ dayNumber, xpReward }: { dayNumber: number; xpReward: number }) {
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [errors, setErrors] = useState<{ github?: string; linkedin?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationErrors = useMemo(() => ({
    github: githubUrl ? VALIDATORS.github(githubUrl) : null,
    linkedin: linkedinUrl ? VALIDATORS.linkedin(linkedinUrl) : null,
  }), [githubUrl, linkedinUrl]);

  const isValid = !validationErrors.github && !validationErrors.linkedin && githubUrl && linkedinUrl;

  const handleSubmit = () => {
    const gErr = VALIDATORS.github(githubUrl);
    const lErr = VALIDATORS.linkedin(linkedinUrl);
    if (gErr || lErr) {
      setErrors({ github: gErr || undefined, linkedin: lErr || undefined });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-palette-green-50 dark:bg-palette-green-900/20 rounded-xl border border-palette-green-200 dark:border-palette-green-800">
          <div className="w-10 h-10 rounded-full bg-palette-green-100 dark:bg-palette-green-900/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-palette-green-600 dark:text-palette-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-body-sm font-semibold text-palette-green-700 dark:text-palette-green-300">Day {dayNumber} completed!</p>
            <p className="text-body-sm text-palette-green-600 dark:text-palette-green-400">+{xpReward} XP earned. Keep the streak going!</p>
          </div>
        </div>
        <Link href={dayNumber < 60 ? `/day/${dayNumber + 1}` : "/dashboard"}>
          <Button className="w-full" size="lg">
            {dayNumber < 60 ? `Continue to Day ${dayNumber + 1} →` : "View Dashboard"}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="github" className="block text-body-sm font-medium text-palette-neutral-700 dark:text-palette-neutral-300 mb-2">
          GitHub Commit URL
        </label>
        <input
          id="github"
          type="url"
          value={githubUrl}
          onChange={(e) => { setGithubUrl(e.target.value); setErrors(prev => ({ ...prev, github: undefined })); }}
          placeholder="https://github.com/owner/repo/commit/abc123"
          className={`w-full px-4 py-3 rounded-lg border ${errors.github || (githubUrl && validationErrors.github) ? "border-palette-red-500" : "border-palette-neutral-300 dark:border-palette-neutral-600"} bg-white dark:bg-palette-neutral-900 text-palette-neutral-900 dark:text-palette-neutral-50 text-body-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary-500 transition-colors`}
        />
        {(errors.github || (githubUrl && validationErrors.github)) && (
          <p className="mt-2 text-body-sm text-palette-red-600 dark:text-palette-red-400">{errors.github || validationErrors.github}</p>
        )}
        {githubUrl && !validationErrors.github && (
          <p className="mt-2 text-body-sm text-palette-green-600 dark:text-palette-green-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Valid GitHub URL
          </p>
        )}
      </div>
      <div>
        <label htmlFor="linkedin" className="block text-body-sm font-medium text-palette-neutral-700 dark:text-palette-neutral-300 mb-2">
          LinkedIn Post URL
        </label>
        <input
          id="linkedin"
          type="url"
          value={linkedinUrl}
          onChange={(e) => { setLinkedinUrl(e.target.value); setErrors(prev => ({ ...prev, linkedin: undefined })); }}
          placeholder="https://www.linkedin.com/posts/user_activity-1234567890"
          className={`w-full px-4 py-3 rounded-lg border ${errors.linkedin || (linkedinUrl && validationErrors.linkedin) ? "border-palette-red-500" : "border-palette-neutral-300 dark:border-palette-neutral-600"} bg-white dark:bg-palette-neutral-900 text-palette-neutral-900 dark:text-palette-neutral-50 text-body-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary-500 transition-colors`}
        />
        {(errors.linkedin || (linkedinUrl && validationErrors.linkedin)) && (
          <p className="mt-2 text-body-sm text-palette-red-600 dark:text-palette-red-400">{errors.linkedin || validationErrors.linkedin}</p>
        )}
        {linkedinUrl && !validationErrors.linkedin && (
          <p className="mt-2 text-body-sm text-palette-green-600 dark:text-palette-green-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Valid LinkedIn URL
          </p>
        )}
      </div>
      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={!isValid || isSubmitting} loading={isSubmitting}>
        {isSubmitting ? "Submitting..." : `Submit Day ${dayNumber}`}
      </Button>
    </div>
  );
}

export default function DayPage() {
  const params = useParams();
  const dayNumber = Number(params.day);

  const track = getTrack(variant);
  const todayDay = getTodayDayNumber(variant);
  const coachContext = getCoachContext(variant);
  const coachMessage = generateCoachMessage(coachContext);

  if (dayNumber < 1 || dayNumber > track.totalDays) {
    return (
      <div className="min-h-screen">
        <MobileHeader title="Invalid Day" showStreak={false} />
        <PageContainer>
          <EmptyState
            title="Invalid Day"
            description="Please select a valid day from the challenge."
            illustration="calendar"
            size="lg"
            variant="card"
            action={<Link href="/dashboard"><Button>Back to Dashboard</Button></Link>}
          />
        </PageContainer>
        <MobileNav />
      </div>
    );
  }

  const task = getTaskByDay(dayNumber, variant);

  if (!task) {
    return <LockedDayView dayNumber={dayNumber} todayDay={todayDay} coachMessage={coachMessage} />;
  }

  const existingSubmission = getSubmissionByDay(dayNumber, variant);
  const status = getDayStatus(dayNumber, variant);
  const isMissed = status === "missed";

  return (
    <div className="min-h-screen">
      <MobileHeader
        title={`Day ${dayNumber}`}
        subtitle={task.title}
        showStreak={true}
        showBack={true}
        backHref="/dashboard"
      />
      <PageContainer>
        <div className="space-y-6">
          <ScrollReveal direction="up">
            <div className="mb-2">
              <span className="text-caption font-mono text-palette-neutral-500 dark:text-palette-neutral-400">Day {dayNumber} of {track.totalDays}</span>
              <Badge variant="outline" className="ml-3"><StatusBadge status={status} size="sm" /></Badge>
            </div>
            <h1 className="text-display-md font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 tracking-tight">{task.title}</h1>
            <p className="mt-3 text-body-lg text-palette-neutral-600 dark:text-palette-neutral-400">{task.description}</p>
          </ScrollReveal>

          {isMissed && (
            <ScrollReveal direction="up" delay={0.05}>
              <Card variant="outlined" padding="lg">
                <div className="flex items-start gap-3 p-4 bg-palette-red-50 dark:bg-palette-red-900/20 rounded-xl border border-palette-red-200 dark:border-palette-red-800">
                  <div className="w-10 h-10 rounded-full bg-palette-red-100 dark:bg-palette-red-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-palette-red-600 dark:text-palette-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-palette-red-700 dark:text-palette-red-300">This day was missed</p>
                    <p className="mt-1 text-body-sm text-palette-red-600 dark:text-palette-red-400">You can still complete it now to earn partial XP. Your streak won&apos;t recover until you complete today&apos;s task.</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          )}

          <ScrollReveal direction="up" delay={0.1}>
            <Card variant="elevated" padding="lg">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-palette-primary-100 dark:bg-palette-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-heading-lg font-bold text-palette-primary-600 dark:text-palette-primary-400 font-mono">Day {dayNumber}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50">{task.title}</h2>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" size="sm">{task.category}</Badge>
                  <Badge variant={task.difficulty === "hard" ? "destructive" : task.difficulty === "medium" ? "warning" : "success"} size="sm">{task.difficulty}</Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{task.estimatedMinutes} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>+{task.xpReward} XP</span>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <Card variant="elevated" padding="lg">
              <CardHeader><CardTitle>Acceptance Criteria</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Code compiles and runs without errors",
                    "Core functionality is implemented and tested",
                    "Code follows clean naming conventions",
                    "GitHub commit message is descriptive",
                    "LinkedIn post explains what you learned",
                    "Submission completed within the time estimate",
                  ].map((criteria, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-md text-palette-neutral-700 dark:text-palette-neutral-300">
                      <svg className="w-5 h-5 text-palette-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <CoachCard coachMessage={coachMessage} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>{existingSubmission ? "Submission Confirmed" : "Submit Your Work"}</CardTitle>
              </CardHeader>
              <CardContent>
                {existingSubmission ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-palette-green-50 dark:bg-palette-green-900/20 rounded-xl border border-palette-green-200 dark:border-palette-green-800">
                      <div className="w-10 h-10 rounded-full bg-palette-green-100 dark:bg-palette-green-900/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-palette-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-body-sm font-semibold text-palette-green-700 dark:text-palette-green-300">Already submitted!</p>
                        <p className="text-body-sm text-palette-green-600 dark:text-palette-green-400">+{task.xpReward} XP earned.</p>
                      </div>
                    </div>
                    {existingSubmission.feedback && (
                      <div className="p-4 bg-palette-primary-50 dark:bg-palette-primary-900/20 rounded-xl border border-palette-primary-200 dark:border-palette-primary-800">
                        <p className="text-body-sm font-semibold text-palette-primary-700 dark:text-palette-primary-300">Feedback</p>
                        <p className="mt-1 text-body-sm text-palette-primary-600 dark:text-palette-primary-400">{existingSubmission.feedback}</p>
                        {existingSubmission.score && (
                          <p className="mt-2 text-body-sm font-mono font-bold text-palette-primary-700 dark:text-palette-primary-300">Score: {existingSubmission.score}/100</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <SubmissionForm dayNumber={dayNumber} xpReward={task.xpReward} />
                )}
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {dayNumber > 1 && (
                <Link href={`/day/${dayNumber - 1}`} className="flex-1">
                  <Button variant="outline" className="w-full">← Day {dayNumber - 1}</Button>
                </Link>
              )}
              {dayNumber < track.totalDays && (
                <Link href={`/day/${dayNumber + 1}`} className="flex-1">
                  <Button variant="outline" className="w-full">Day {dayNumber + 1} →</Button>
                </Link>
              )}
              <Link href="/dashboard" className="flex-1">
                <Button variant="ghost" className="w-full">Dashboard</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </PageContainer>
      <MobileNav />
    </div>
  );
}
