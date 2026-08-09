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
      default: "bg-palette-neutral-800/80 text-palette-neutral-200 border border-palette-neutral-700/60",
      primary: "bg-palette-primary-500/15 text-palette-primary-300 border border-palette-primary-500/40",
      secondary: "bg-palette-accent-400/15 text-palette-accent-300 border border-palette-accent-400/40",
      success: "bg-palette-green-500/15 text-palette-green-300 border border-palette-green-500/40",
      warning: "bg-palette-amber-500/15 text-palette-amber-300 border border-palette-amber-500/40",
      destructive: "bg-palette-red-500/15 text-palette-red-300 border border-palette-red-500/40",
      outline: "bg-transparent border border-palette-neutral-700 text-palette-neutral-300",
    };
    
    const sizeStyles = {
      sm: "px-2 py-0.5 text-caption gap-1",
      md: "px-2.5 py-1 text-body-sm gap-1.5",
      lg: "px-3 py-1.5 text-body-md gap-2",
    };
    
    const baseStyles = "inline-flex items-center font-medium rounded-full backdrop-blur-sm transition-colors";
    
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