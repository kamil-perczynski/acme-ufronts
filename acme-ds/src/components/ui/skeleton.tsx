import { cn } from "~/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ds-animate-pulse ds-rounded-md ds-bg-primary/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
