import React, { useCallback, useMemo, useState } from "react";
import { CreatePurchaseForm } from "./components/types";

export function useCreatePurchase(): CreatePurchaseContextValue {
  const [progress, setProgress] = useState(0);
  const [purchaseForm, setPurchaseForm] = useState<CreatePurchaseForm | null>(
    null,
  );

  const handleValidSubmit = useCallback((values: CreatePurchaseForm) => {
    setProgress(1);
    setPurchaseForm(values);
    window.scrollTo(0, 0);
  }, []);

  const [isOtpSubmitting, setOtpSubmitting] = useState(false);

  const handleValidOtp = useCallback(async ({ otp }: { otp: string }) => {
    setOtpSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOtpSubmitting(false);

    if (otp === "666666" || otp === "111111") {
      setProgress(2);
      window.scrollTo(0, 0);
      return true;
    }

    return false;
  }, []);

  return useMemo(
    () => ({
      handleValidSubmit,
      purchaseForm,
      step: progress,
      handleValidOtp,
      isOtpSubmitting,
    }),
    [
      handleValidSubmit,
      purchaseForm,
      progress,
      handleValidOtp,
      isOtpSubmitting,
    ],
  );
}

export interface CreatePurchaseContextValue {
  handleValidSubmit: (values: CreatePurchaseForm) => void;
  handleValidOtp: (values: { otp: string }) => Promise<boolean>;
  purchaseForm: CreatePurchaseForm | null;
  step: number;
  isOtpSubmitting: boolean;
}

export const CreatePurchaseContext = React.createContext(
  {} as unknown as CreatePurchaseContextValue,
);
