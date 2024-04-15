import React from "react";
import { Skeleton } from "@acme/acme-ds";

export const MicrofrontSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col mt-20 w-min space-y-8">
      <Skeleton className="h-[125px] w-[850px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <Skeleton className="h-[225px] w-[450px] rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
