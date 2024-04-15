import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const alertVariants = cva(
  "ds-relative ds-w-full ds-rounded-lg ds-border ds-px-4 ds-py-3 ds-text-sm [&>svg+div]:ds-translate-y-[-3px] [&>svg]:ds-absolute [&>svg]:ds-left-4 [&>svg]:ds-top-4 [&>svg]:ds-text-foreground [&>svg~*]:ds-pl-7",
  {
    variants: {
      variant: {
        default: "ds-bg-background ds-text-foreground",
        destructive:
          "ds-border-destructive/50 ds-text-destructive dark:ds-border-destructive [&>svg]:ds-text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "ds-mb-1 ds-font-medium ds-leading-none ds-tracking-tight",
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ds-text-sm [&_p]:ds-leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
