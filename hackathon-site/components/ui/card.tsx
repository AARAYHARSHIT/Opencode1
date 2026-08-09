"use client";

import { HTMLAttributes, forwardRef } from "react";
import { HoverLift } from "@/components/animations";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", padding = "md", hover = false, className = "", ...props }, ref) => {
    const variantStyles = {
      default: "glass shadow-lg shadow-palette-neutral-950/40",
      elevated: "glass-strong shadow-xl shadow-palette-neutral-950/60",
      outlined: "bg-transparent border border-palette-neutral-800",
      interactive: "glass shadow-lg shadow-palette-neutral-950/40 cursor-pointer",
    };
    
    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };
    
    const baseStyles = "rounded-2xl transition-all duration-300";
    const hoverStyles = hover ? "hover:border-palette-primary-400/50 hover:shadow-glow" : "";
    
    const Component = hover ? HoverLift : "div";
    
    return (
      <Component
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props}>{children}</div>
  )
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = "", ...props }, ref) => (
    <h3 ref={ref} className={`text-heading-lg font-semibold text-palette-neutral-50 ${className}`} {...props}>{children}</h3>
  )
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = "", ...props }, ref) => (
    <p ref={ref} className={`mt-1 text-body-md text-palette-neutral-400 ${className}`} {...props}>{children}</p>
  )
);
CardDescription.displayName = "CardDescription";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={className} {...props}>{children}</div>
  )
);
CardContent.displayName = "CardContent";

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`mt-4 pt-4 border-t border-palette-neutral-800 flex items-center gap-3 ${className}`} {...props}>{children}</div>
  )
);
CardFooter.displayName = "CardFooter";