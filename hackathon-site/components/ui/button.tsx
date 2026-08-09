"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { HoverLift } from "@/components/animations";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", loading = false, fullWidth = false, disabled, className = "", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantStyles = {
      primary: "bg-palette-primary-600 text-white hover:bg-palette-primary-700 focus-visible:ring-palette-primary-500 dark:bg-palette-primary-500 dark:hover:bg-palette-primary-600",
      secondary: "bg-palette-neutral-100 text-palette-neutral-900 hover:bg-palette-neutral-200 focus-visible:ring-palette-neutral-400 dark:bg-palette-neutral-800 dark:text-palette-neutral-50 dark:hover:bg-palette-neutral-700",
      outline: "border-2 border-palette-primary-600 text-palette-primary-600 hover:bg-palette-primary-50 focus-visible:ring-palette-primary-500 dark:border-palette-primary-400 dark:text-palette-primary-400 dark:hover:bg-palette-primary-950/20",
      ghost: "text-palette-neutral-700 hover:bg-palette-neutral-100 focus-visible:ring-palette-neutral-400 dark:text-palette-neutral-300 dark:hover:bg-palette-neutral-800",
      destructive: "bg-palette-red-600 text-white hover:bg-palette-red-700 focus-visible:ring-palette-red-500",
    };
    
    const sizeStyles = {
      sm: "px-3 py-1.5 text-body-sm gap-1.5",
      md: "px-4 py-2 text-body-md gap-2",
      lg: "px-6 py-3 text-body-lg gap-2",
      xl: "px-8 py-4 text-heading-md gap-3",
    };
    
    const widthStyles = fullWidth ? "w-full" : "";
    
    const content = loading ? (
      <>
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Loading...</span>
      </>
    ) : (
      children
    );

    return (
      <HoverLift
        asChild
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      >
        <button
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {content}
        </button>
      </HoverLift>
    );
  }
);

Button.displayName = "Button";