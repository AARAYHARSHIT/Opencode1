"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", size = "md", dot = false, dotColor, className = "", ...props }, ref) => {
    const variantStyles = {
      default: "bg-palette-neutral-100 text-palette-neutral-700 dark:bg-palette-neutral-800 dark:text-palette-neutral-300",
      primary: "bg-palette-primary-100 text-palette-primary-700 dark:bg-palette-primary-900/30 dark:text-palette-primary-300",
      secondary: "bg-palette-accent-100 text-palette-accent-700 dark:bg-palette-accent-900/30 dark:text-palette-accent-300",
      success: "bg-palette-green-100 text-palette-green-700 dark:bg-palette-green-900/30 dark:text-palette-green-300",
      warning: "bg-palette-amber-100 text-palette-amber-700 dark:bg-palette-amber-900/30 dark:text-palette-amber-300",
      destructive: "bg-palette-red-100 text-palette-red-700 dark:bg-palette-red-900/30 dark:text-palette-red-300",
      outline: "bg-transparent border border-palette-neutral-300 text-palette-neutral-700 dark:border-palette-neutral-600 dark:text-palette-neutral-300",
    };
    
    const sizeStyles = {
      sm: "px-2 py-0.5 text-caption gap-1",
      md: "px-2.5 py-1 text-body-sm gap-1.5",
      lg: "px-3 py-1.5 text-body-md gap-2",
    };
    
    const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors";
    
    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor || "bg-current"}`} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: "completed" | "missed" | "today" | "upcoming";
}

const statusVariantMap: Record<StatusBadgeProps["status"], BadgeProps["variant"]> = {
  completed: "success",
  missed: "destructive",
  today: "primary",
  upcoming: "outline",
};

const statusLabelMap: Record<StatusBadgeProps["status"], string> = {
  completed: "Completed",
  missed: "Missed",
  today: "Today",
  upcoming: "Upcoming",
};

export function StatusBadge({ status, size = "md", className = "", ...props }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} size={size} className={className} {...props}>
      {statusLabelMap[status]}
    </Badge>
  );
}