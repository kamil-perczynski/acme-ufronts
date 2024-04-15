"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Parcel, ParcelConfig, mountRootParcel } from "single-spa";
import { MicrofrontSkeleton } from "./MicrofrontSkeleton";

interface Props {
  rootId?: string;
  microfrontId: string;
}

export const Microfront: React.FC<Props> = (props) => {
  const { microfrontId, rootId } = props;

  const pathname = usePathname();
  const router = useRouter();

  const subscription = useRef<null | ((nextPath: string) => void)>(null);

  const subscribe = useCallback(
    (onRouteChanged: (nextPath: string) => void) => {
      subscription.current = onRouteChanged;

      return () => {
        subscription.current = null;
      };
    },
    []
  );

  useEffect(() => {
    if (pathname) {
      subscription.current?.(pathname);
    }
  }, [pathname]);

  const [isMounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let parcelConfig: Parcel | null = null;
    let domElement: HTMLElement | null = null;

    importShim(microfrontId)
      .then((parcelModule: ParcelConfig) => {
        domElement = document.getElementById(rootId ?? microfrontId)!;

        parcelConfig = mountRootParcel(parcelModule, {
          domElement,
          subscribe,
        });

        setMounted(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setMounted(true);
      });

    return () => {
      parcelConfig?.unmount().then(() => domElement?.remove());
    };
  }, [router.prefetch, subscribe, microfrontId, rootId]);

  if (!isMounted) {
    return <MicrofrontSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 flex flex-col gap-6 mt-20 min-h-screen">
        <h1 className="text-4xl font-semibold tracking-tight">Oops, something went wrong</h1>

        <p>Please copy information below and send it to the Administrator.</p>

        <code className="relative rounded bg-muted p-4 font-mono text-sm">
          <b>URL:</b> <br />
          {window.location.toString()}
          <br />
          <br />
          <b>Timestamp:</b> <br />
          {new Date().toLocaleString()}
          <br />
          <br />
          <b>Message:</b> <br /> {error?.message} <br />
          <br />
          <b>Stack:</b> <br /> {error?.stack}
        </code>
      </div>
    );
  }

  return null;
};
