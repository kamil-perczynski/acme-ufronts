import React, { useEffect, useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Root: React.FC = (props: any) => {
  const { subscribe } = props;
  const router = useMemo(() => createBrowserRouter(routes), []);

  useEffect(() => {
    return subscribe((nextPath: string) => {
      router.navigate({ pathname: nextPath }, { replace: true });
      window.scrollTo(0, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
};
