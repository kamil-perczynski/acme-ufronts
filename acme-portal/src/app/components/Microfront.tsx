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

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let parcelConfig: Parcel | null = null;
    let domElement: HTMLElement | null = null;

    domElement = document.getElementById(rootId ?? microfrontId)!;
    Promise.any([
      importShim(microfrontId)
        .then((parcelModule: ParcelConfig) => {
          parcelConfig = mountRootParcel(parcelModule, {
            domElement,
            subscribe,
          });

          return parcelConfig.mountPromise;
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => {
          timeoutMs(350).then(() => {
            if (domElement) {
              domElement.style.opacity = "1";
            }
          });
        }),
      timeoutMs(600).then(() => {
        if (domElement) {
          domElement.style.opacity = "1";
        }
      }),
    ]);

    return () => {
      parcelConfig?.unmount().then(
        () => domElement?.remove(),
        (err) => console.log(err)
      );
    };
  }, [subscribe, microfrontId, rootId]);

  if (error) {
    return (
      <div className="flex flex-col gap-6 mt-8">
        <h1 className="text-2xl font-semibold tracking-tight">
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
      </div>
    );
  }

  return <MicrofrontSkeleton />;
};

function timeoutMs(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
