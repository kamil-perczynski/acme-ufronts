"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Parcel, ParcelConfig, mountRootParcel } from "single-spa";
import { MicrofrontSkeleton } from "./MicrofrontSkeleton";
import { createPortal } from "react-dom";

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

  const [ufrontMounted, setUfrontMounted] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let parcelConfig: Parcel | null = null;
    let domElement: HTMLElement | null = null;

    Promise.all([timeoutMs(200), importShim(microfrontId)])
      .then(async ([, parcelModule]: [unknown, ParcelConfig]) => {
        domElement = document.getElementById(rootId ?? microfrontId)!;

        parcelConfig = mountRootParcel(parcelModule, {
          domElement,
          subscribe,
        });

        setUfrontMounted(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setUfrontMounted(true);
      });

    return () => {
      parcelConfig?.unmount().then(() => domElement?.remove());
    };
  }, [router.prefetch, subscribe, microfrontId, rootId]);

  if (isMounted && !ufrontMounted) {
    return createPortal(
      <MicrofrontSkeleton />,
      document.getElementById(rootId ?? microfrontId)!
    );
  }

  if (error) {
    return createPortal(
      <div className="flex flex-col gap-6 mt-20 min-h-screen">
        <h1 className="text-4xl font-semibold tracking-tight">
          Oops, something went wrong
        </h1>

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
      </div>,
      document.getElementById(rootId ?? microfrontId)!
    );
  }

  return null;
};

function timeoutMs(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
