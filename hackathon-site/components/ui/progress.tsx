"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = "md", variant = "default", showLabel = false, label, animated = false, striped = false, className = "", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const sizeStyles = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    };
    
    const variantStyles = {
      default: "bg-gradient-to-r from-palette-primary-500 to-palette-secondary-400 shadow-sm shadow-palette-primary-500/40",
      primary: "bg-gradient-to-r from-palette-primary-500 to-palette-secondary-400 shadow-sm shadow-palette-primary-500/40",
      success: "bg-gradient-to-r from-palette-green-500 to-palette-green-400 shadow-sm shadow-palette-green-500/40",
      warning: "bg-gradient-to-r from-palette-amber-500 to-palette-amber-400 shadow-sm shadow-palette-amber-500/40",
      destructive: "bg-gradient-to-r from-palette-red-500 to-palette-red-400 shadow-sm shadow-palette-red-500/40",
    };
    
    const baseStyles = "w-full bg-palette-neutral-800/80 rounded-full overflow-hidden";
    const barStyles = "h-full rounded-full transition-all duration-500 ease-out";
    const animatedStyles = animated ? "animate-pulse" : "";
    const stripedStyles = striped ? "bg-stripes" : "";
    
    return (
      <div ref={ref} className={`${baseStyles} ${sizeStyles[size]} ${className}`} {...props}>
        <div
          className={`${barStyles} ${variantStyles[variant]} ${animatedStyles} ${stripedStyles}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${Math.round(percentage)}%`}
        />
        {showLabel && (
          <div className="mt-1.5 flex items-center justify-between text-body-sm text-palette-neutral-400">
            <span>{label || "Progress"}</span>
            <span className="font-mono font-medium">{Math.round(percentage)}%</span>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  showLabel?: boolean;
  label?: string;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ value, max = 100, size = 64, strokeWidth = 6, variant = "default", showLabel = true, label, className = "", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    const variantStyles = {
      default: "text-palette-primary-500",
      primary: "text-palette-primary-500",
      success: "text-palette-green-500",
      warning: "text-palette-amber-500",
      destructive: "text-palette-red-500",
    };
    
    const trackColor = "text-palette-neutral-800";
    
    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className={trackColor}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="none"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={`${variantStyles[variant]} transition-all duration-500 ease-out`}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(249,115,22,0.5))" }}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="font-mono text-heading-md font-bold">{Math.round(percentage)}%</span>
              {label && <p className="text-caption text-palette-neutral-500 mt-0.5">{label}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

export interface StepProgressProps {
  currentStep: number;
  steps: Array<{ label: string; description?: string; completed?: boolean; current?: boolean }>;
  variant?: "default" | "compact";
  direction?: "horizontal" | "vertical";
}

export function StepProgress({ currentStep, steps, variant = "default", direction = "horizontal" }: StepProgressProps) {
  const isVertical = direction === "vertical";
  
  return (
    <div className={`flex ${isVertical ? "flex-col" : "flex-row"} items-${isVertical ? "start" : "center"}`}>
      <div className={`relative flex ${isVertical ? "flex-col" : "flex-row"} items-center`}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = step.completed || stepNumber < currentStep;
          const isCurrent = step.current || stepNumber === currentStep;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.label} className={`flex ${isVertical ? "flex-col items-start" : "flex-row items-center"}`}>
              <div className={`relative flex items-center justify-center z-10 ${isVertical ? "mb-2" : ""}`}>
                {!isLast && (
                  <div
                    className={`absolute ${isVertical ? "left-1/2 top-full h-full w-0.5 -translate-x-1/2" : "bottom-1/2 left-full w-full h-0.5 -translate-y-1/2"} transition-colors`}
                    style={{ backgroundColor: isCompleted ? "#10b981" : "#1e293b" }}
                  />
                )}
                <div
                  className={`flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-palette-green-600 border-palette-green-500 text-white shadow-md shadow-palette-green-500/30"
                      : isCurrent
                      ? "bg-palette-primary-600 border-palette-primary-400 text-white shadow-glow"
                      : "bg-palette-neutral-900 border-palette-neutral-700 text-palette-neutral-500"
                  }`}
                  style={{ width: variant === "compact" ? 24 : 32, height: variant === "compact" ? 24 : 32 }}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="font-mono font-bold text-body-sm">{stepNumber}</span>
                  )}
                </div>
              </div>
              <div className={`${isVertical ? "ml-4 mt-2" : "ml-3"}`}>
                <p className={`font-medium text-body-sm ${isCurrent ? "text-palette-primary-400" : isCompleted ? "text-palette-neutral-50" : "text-palette-neutral-500"}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className={`text-caption ${isCurrent ? "text-palette-secondary-400" : "text-palette-neutral-600"}`}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}