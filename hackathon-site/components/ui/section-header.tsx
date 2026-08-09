"use client";

import { HTMLAttributes, forwardRef } from "react";
import { ScrollReveal } from "@/components/animations";
import { Badge } from "@/components/ui/badge";

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: "default" | "minimal" | "card" | "divided";
  align?: "left" | "center" | "right";
  delay?: number;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({
    title,
    description,
    subtitle,
    action,
    badge,
    variant = "default",
    align = "left",
    delay = 0,
    className = "",
    children,
    ...props
  }, ref) => {
    const alignStyles = {
      left: "text-left items-start",
      center: "text-center items-center",
      right: "text-right items-end",
    };
    
    const variantStyles = {
      default: "mb-6 xs:mb-8 lg:mb-10",
      minimal: "mb-4",
      card: "mb-6 p-6 xs:p-8 glass rounded-2xl shadow-lg shadow-palette-neutral-950/40",
      divided: "mb-6 xs:mb-8 lg:mb-10 pb-4 xs:pb-6 border-b border-palette-neutral-800",
    };
    
    const content = (
      <div className={`flex flex-col ${alignStyles[align]} gap-3 w-full ${variant === "card" ? "max-w-3xl" : ""}`}>
        <div className="flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-3 w-full">
          <div>
            {badge && (
              <div className="mb-2 inline-flex">{badge}</div>
            )}
            <h2 className="text-heading-xl font-semibold text-palette-neutral-50 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-body-sm text-palette-neutral-500 font-mono">{subtitle}</p>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0 mt-2 xs:mt-0">{action}</div>
          )}
        </div>
        {description && (
          <p className="text-body-lg text-palette-neutral-400 max-w-2xl">{description}</p>
        )}
        {children}
      </div>
    );
    
    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        <ScrollReveal direction="up" delay={delay}>
          {content}
        </ScrollReveal>
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export interface PageHeaderProps extends Omit<SectionHeaderProps, "variant"> {
  backLink?: React.ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, subtitle, action, badge, delay = 0, backLink, className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-8 xs:mb-12 lg:mb-16 ${className}`} {...props}>
        <ScrollReveal direction="up" delay={delay}>
          <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-4 w-full">
            <div className="flex flex-col gap-3 w-full">
              {backLink && (
                <div className="flex items-center gap-2 text-body-sm text-palette-neutral-500 hover:text-palette-primary-400 transition-colors">
                  {backLink}
                </div>
              )}
              <div className="flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-3 w-full">
                <div>
                  {badge && <div className="mb-2 inline-flex">{badge}</div>}
                  <h1 className="text-display-md font-semibold text-palette-neutral-50 tracking-tight">{title}</h1>
                  {subtitle && <p className="mt-1 text-body-sm text-palette-neutral-500 font-mono">{subtitle}</p>}
                </div>
                {action && <div className="flex-shrink-0 mt-2 xs:mt-0">{action}</div>}
              </div>
              {description && <p className="text-body-lg text-palette-neutral-400 max-w-2xl">{description}</p>}
              {children}
            </div>
          </div>
        </ScrollReveal>
      </div>
    );
  }
);

PageHeader.displayName = "PageHeader";

export function DayHeader({ day, totalDays, title, description, status, variant = "default" }: {
  day: number;
  totalDays: number;
  title: string;
  description?: string;
  status: "completed" | "missed" | "today" | "upcoming";
  variant?: "default" | "compact";
}) {
  const statusColors = {
    completed: "bg-palette-green-500/15 text-palette-green-300 border-palette-green-500/40",
    missed: "bg-palette-red-500/15 text-palette-red-300 border-palette-red-500/40",
    today: "bg-palette-primary-500/15 text-palette-primary-300 border-palette-primary-500/40",
    upcoming: "bg-palette-neutral-800 text-palette-neutral-300 border-palette-neutral-700",
  };
  
  const statusLabels = {
    completed: "Completed",
    missed: "Missed",
    today: "Today",
    upcoming: "Upcoming",
  };
  
  if (variant === "compact") {
    return (
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-6 pb-4 border-b border-palette-neutral-800">
        <div className="flex items-center gap-3">
          <span className="text-caption font-mono text-palette-neutral-500">Day {day} of {totalDays}</span>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
        <h1 className="text-heading-xl font-semibold text-palette-neutral-50">{title}</h1>
      </div>
    );
  }
  
  return (
    <div className="mb-8 xs:mb-12">
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-caption font-mono text-palette-neutral-500">Day {day} of {totalDays}</span>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </div>
      <h1 className="text-display-md font-semibold text-palette-neutral-50 tracking-tight mb-2">{title}</h1>
      {description && <p className="text-body-lg text-palette-neutral-400 max-w-2xl">{description}</p>}
    </div>
  );
}