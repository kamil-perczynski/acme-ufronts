import React, { useEffect } from "react";
import { Stepper } from "../components/stepper/Stepper";
import { useBlocker } from "react-router-dom";
import { CreatePurchaseContext, useCreatePurchase } from "./useCreatePurchase";
import { CreatePurchaseFormPage } from "./CreatePurchaseFormPage";
import { CreatePurchaseConfirmationPage } from "./CreatePurchaseConfirmationPage";
import { CreatePurchaseSummaryPage } from "./CreatePurchaseSummaryPage";

interface Props {}

export const CreatePurchasePage: React.FC<Props> = () => {
  const ctx = useCreatePurchase();

  return (
    <div className="pc-flex pc-flex-col pc-gap-8 pc-mt-4 pc-lg:mt-12">
      <Stepper
        items={["Form", "Confirmation", "Summary"]}
        activeItem={ctx.step}
      />

      <CreatePurchaseContext.Provider value={ctx}>
        {(() => {
          switch (ctx.step) {
            case 0:
              return <CreatePurchaseFormPage />;
            case 1:
              return <CreatePurchaseConfirmationPage />;
            case 2:
              return <CreatePurchaseSummaryPage />;
          }
        })()}
      </CreatePurchaseContext.Provider>
    </div>
  );
};

export const Component = CreatePurchasePage;

// eslint-disable-next-line react-refresh/only-export-components
export function usePreventAccidentalLeave() {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (
      blocker.state === "blocked" &&
      confirm(
        "Are you sure you want to leave? You will need to start the process all over.",
      )
    ) {
      blocker.proceed();
    } else {
      blocker?.reset?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocker.state]);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("unload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("unload", beforeUnload);
    };
  }, []);
}
