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
      primary: "bg-gradient-to-b from-palette-primary-500 to-palette-primary-600 text-white shadow-md shadow-palette-primary-900/40 hover:shadow-glow hover:brightness-110 focus-visible:ring-palette-primary-400",
      secondary: "glass-strong text-palette-neutral-50 hover:bg-palette-neutral-800/60 hover:border-white/25 focus-visible:ring-palette-secondary-400",
      outline: "glass text-palette-neutral-100 hover:border-palette-primary-400/60 hover:text-white hover:bg-palette-primary-500/10 focus-visible:ring-palette-primary-400",
      ghost: "text-palette-neutral-400 hover:text-palette-neutral-100 hover:bg-palette-neutral-800/60 focus-visible:ring-palette-neutral-400",
      destructive: "bg-gradient-to-b from-palette-red-500 to-palette-red-700 text-white hover:brightness-110 focus-visible:ring-palette-red-500",
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