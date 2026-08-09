"use client";

import { HTMLAttributes, forwardRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: "default" | "card" | "inline" | "fullscreen";
  size?: "sm" | "md" | "lg";
  illustration?: "none" | "search" | "folder" | "user" | "calendar" | "trophy" | "code" | "custom";
}

type IllustrationKey = "none" | "search" | "folder" | "user" | "calendar" | "trophy" | "code";

const illustrations: Record<IllustrationKey, React.ReactNode> = {
  none: null,
  search: (
    <svg className="w-16 h-16 text-palette-neutral-300 dark:text-palette-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  folder: (
    <svg className="w-16 h-16 text-palette-neutral-300 dark:text-palette-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  user: (
    <svg className="w-16 h-16 text-palette-neutral-300 dark:text-palette-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  calendar: (
    <svg className="w-16 h-16 text-palette-neutral-300 dark:text-palette-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  trophy: (
    <svg className="w-16 h-16 text-palette-neutral-300 dark:text-palette-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  code: (
    <svg className="w-16 h-16 text-palette-neutral-300 dark:text-palette-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({
    title,
    description,
    icon,
    action,
    secondaryAction,
    variant = "default",
    size = "md",
    illustration = "none",
    className = "",
    children,
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: { icon: "w-10 h-10", title: "text-heading-md", desc: "text-body-sm", gap: "gap-2", padding: "p-4" },
      md: { icon: "w-16 h-16", title: "text-heading-xl", desc: "text-body-md", gap: "gap-3", padding: "p-8" },
      lg: { icon: "w-20 h-20", title: "text-display-md", desc: "text-body-lg", gap: "gap-4", padding: "p-12" },
    };
    
    const variantStyles = {
      default: "text-center",
      card: "text-center bg-white dark:bg-palette-neutral-900 rounded-xl border border-palette-neutral-200 dark:border-palette-neutral-800 shadow-sm",
      inline: "text-center py-8",
      fullscreen: "text-center min-h-[60vh] flex flex-col items-center justify-center px-4",
    };
    
    const s = sizeStyles[size];
    const showIllustration = illustration !== "none" && !icon;
    const illustrationNode = illustration !== "custom" ? (illustrations[illustration as IllustrationKey] || null) : null;
    
    const content = (
      <div className={`flex flex-col items-center ${s.gap} ${s.padding} w-full`}>
        {(icon || showIllustration) && (
          <div className={`flex items-center justify-center ${s.icon} text-palette-neutral-400 dark:text-palette-neutral-500`}>
            {icon || illustrationNode}
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          <h2 className={`${s.title} font-semibold text-palette-neutral-900 dark:text-palette-neutral-50`}>{title}</h2>
          {description && (
            <p className={`${s.desc} text-palette-neutral-600 dark:text-palette-neutral-400 max-w-xs text-center`}>{description}</p>
          )}
        </div>
        {(action || secondaryAction) && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            {secondaryAction && (
              <Button variant="ghost" size={size === "sm" ? "sm" : "md"} className="w-full sm:w-auto">
                {secondaryAction}
              </Button>
            )}
            {action && (
              <Button size={size === "sm" ? "sm" : "md"} className="w-full sm:w-auto">
                {action}
              </Button>
            )}
          </div>
        )}
        {children}
      </div>
    );
    
    const Wrapper = variant === "card" ? Card : "div";
    
    return (
      <Wrapper
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        <ScrollReveal direction="up">
          {content}
        </ScrollReveal>
      </Wrapper>
    );
  }
);

EmptyState.displayName = "EmptyState";

export function EmptyProfileState({ onAction }: { onAction?: React.ReactNode }) {
  return (
    <EmptyState
      title="Welcome to Your Journey"
      description="Set up your profile to start tracking your 60-day coding challenge progress."
      illustration="user"
      size="lg"
      variant="card"
      action={<Button onClick={() => {}}>Create Profile</Button>}
    >
      {onAction}
    </EmptyState>
  );
}

export function EmptyChallengeState({ onAction }: { onAction?: React.ReactNode }) {
  return (
    <EmptyState
      title="No Active Challenge"
      description="You haven't started a challenge yet. Pick a track and begin your coding journey."
      illustration="calendar"
      size="lg"
      variant="card"
      action={<Button onClick={() => {}}>Browse Challenges</Button>}
    >
      {onAction}
    </EmptyState>
  );
}

export function EmptySubmissionsState({ onAction }: { onAction?: React.ReactNode }) {
  return (
    <EmptyState
      title="No Submissions Yet"
      description="Complete your daily tasks and submit your work to see it here."
      illustration="folder"
      size="md"
      variant="card"
      action={<Button onClick={() => {}}>View Today's Task</Button>}
    >
      {onAction}
    </EmptyState>
  );
}

export function EmptyAchievementsState({ onAction }: { onAction?: React.ReactNode }) {
  return (
    <EmptyState
      title="No Achievements Unlocked"
      description="Complete tasks and maintain streaks to earn badges and rewards."
      illustration="trophy"
      size="md"
      variant="card"
      action={<Button onClick={() => {}}>View Challenges</Button>}
    >
      {onAction}
    </EmptyState>
  );
}

export function EmptySearchState({ query, onAction }: { query?: string; onAction?: React.ReactNode }) {
  return (
    <EmptyState
      title={query ? `No results for "${query}"` : "Nothing Found"}
      description={query ? "Try adjusting your search or filter criteria." : "We couldn't find anything matching your criteria."}
      illustration="search"
      size="md"
      variant="inline"
      secondaryAction={<Button variant="outline" onClick={() => {}}>Clear Filters</Button>}
    >
      {onAction}
    </EmptyState>
  );
}

export function EmptyErrorState({ title = "Something Went Wrong", description = "An unexpected error occurred. Please try again.", onAction }: { title?: string; description?: string; onAction?: React.ReactNode }) {
  return (
    <EmptyState
      title={title}
      description={description}
      illustration="code"
      size="lg"
      variant="card"
      action={<Button onClick={() => window.location.reload()}>Try Again</Button>}
    >
      {onAction}
    </EmptyState>
  );
}