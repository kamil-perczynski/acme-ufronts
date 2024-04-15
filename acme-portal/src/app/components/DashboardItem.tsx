"use client";
import { Badge } from "@acme/acme-ds";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";

type Props = {
  icon: React.ReactNode;
  text: string;
  badge?: string;
  href: string;
} & JSX.IntrinsicElements["a"];

export const DashboardItem: React.FC<Props> = (props) => {
  const { icon, text, badge, href, ...rest } = props;

  const pathname = usePathname();

  const isCurrentRoute = pathname == href;

  const classes = cn(
    isCurrentRoute && "bg-muted text-black",
    !isCurrentRoute && "text-muted-foreground",
  );

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-black",
        classes,
      )}
      {...rest}
    >
      {icon}
      {text}

      {badge && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
};
