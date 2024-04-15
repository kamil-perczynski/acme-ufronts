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

  useEffect(() => {
    let parcelConfig: Parcel | null = null;
    let domElement: HTMLElement | null = null;

    importShim(microfrontId).then((parcelModule: ParcelConfig) => {
      domElement = document.getElementById(rootId ?? microfrontId)!;

      parcelConfig = mountRootParcel(parcelModule, {
        domElement,
        subscribe,
      });

      setMounted(true);
    });

    return () => {
      parcelConfig?.unmount().then(() => domElement?.remove());
    };
  }, [router.prefetch, subscribe, microfrontId, rootId]);

  if (!isMounted) {
    return <MicrofrontSkeleton />;
  }

  return null;
};
