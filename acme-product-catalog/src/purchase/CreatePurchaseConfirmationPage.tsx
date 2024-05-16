import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Button,
} from "@acme/acme-ds";
import clsx from "clsx";
import { ChevronDown, Loader2, RefreshCw } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePurchaseForm } from "./components/types";
import { CreatePurchaseFormView } from "./components/CreatePurchaseFormView";
import { CreatePurchaseContext } from "./useCreatePurchase";
import { usePreventAccidentalLeave } from "./CreatePurchasePage";
import { FormItem } from "../components/forms/FormItem";

interface Props {}

export const CreatePurchaseConfirmationPage: React.FC<Props> = () => {
  usePreventAccidentalLeave();

  const [open, setOpen] = useState(false);
  const { purchaseForm, handleValidOtp, isOtpSubmitting } = useContext(
    CreatePurchaseContext,
  );

  const otpForm = useForm<{ otp: string }>({
    mode: "onSubmit",
    defaultValues: {
      otp: "",
    },
    disabled: isOtpSubmitting,
  });

  const form = useForm<CreatePurchaseForm>({
    mode: "onBlur",
    defaultValues: purchaseForm!,
    disabled: true,
  });

  const otpFormElRef = useRef<HTMLFormElement>(null);

  const handleOtpSubmitted = ({ otp }: { otp: string }) => {
    handleValidOtp({ otp }).then((codeValid) => {
      if (!codeValid) {
        otpForm.setError("otp", {
          type: "otp",
        });
      }
    });
  };

  if (!purchaseForm) {
    return null;
  }

  return (
    <>
      <h1 className="pc-text-3xl pc-font-semibold pc-border-b-[1px] pc-border-gray pc-pb-2">
        Create purchase
        <span className="pc-text-2xl pc-font-light pc-pl-2 pc-pb-2 pc-text-slate-400">
          / confirmation
        </span>
      </h1>

      <div className="pc-max-w-[400px] pc-w-full pc-mt-4 pc-flex pc-flex-col pc-gap-4">
        <FormProvider {...otpForm}>
          <p className="text-sm pc-text-slate-500">
            You are confirming operation no 1 on{" "}
            {new Date().toISOString().substring(0, 10)}. Please use the code we
            sent on your mobile phone.
          </p>

          <form
            ref={otpFormElRef}
            className="pc-text-xs pc-flex pc-flex-col pc-gap-y-2"
            onSubmit={otpForm.handleSubmit(handleOtpSubmitted)}
          >
            <FormItem
              label="Code"
              inputProps={{
                name: "otp",
                rules: { minLength: 6, required: true },
              }}
              input={
                <InputOTP
                  onComplete={() => otpFormElRef.current?.requestSubmit?.()}
                  maxLength={6}
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="pc-size-14 pc-text-2xl pc-font-mono"
                      index={0}
                    />
                    <InputOTPSlot
                      className="pc-size-14 pc-text-2xl pc-font-mono"
                      index={1}
                    />
                    <InputOTPSlot
                      className="pc-size-14 pc-text-2xl pc-font-mono"
                      index={2}
                    />
                    <InputOTPSlot
                      className="pc-size-14 pc-text-2xl pc-font-mono"
                      index={3}
                    />
                    <InputOTPSlot
                      className="pc-size-14 pc-text-2xl pc-font-mono"
                      index={4}
                    />
                    <InputOTPSlot
                      className="pc-size-14 pc-text-2xl pc-font-mono"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              }
            />
            <br />
            <div className="pc-w-full pc-flex pc-justify-between">
              <Button
                disabled={otpForm.formState.disabled}
                size="sm"
                type="submit"
              >
                {isOtpSubmitting && (
                  <Loader2 className="pc-mr-2 pc-h-4 pc-w-4 pc-animate-spin" />
                )}
                Confirm
              </Button>

              <Button
                disabled={otpForm.formState.disabled}
                size="sm"
                variant="ghost"
                type="button"
              >
                <RefreshCw size={16} />
                &nbsp; Resend code
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>

      <p className="text-sm pc-text-slate-500">
        Below you can still look up your form preview. Better safe than sorry!
        😊
      </p>

      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="pc-w-full pc-space-y-2 pc-flex pc-flex-col pc-gap-4"
      >
        <CollapsibleTrigger asChild>
          <button className="pc-w-full pc-border-b pc-flex pc-appearance-none pc-outline-none pc-py-1 focus-visible:pc-border-accent pc-items-center">
            <div className="pc-flex-1 pc-text-left">
              <h4 className="pc-font-medium">Form preview</h4>
            </div>

            <ChevronDown
              className={clsx(
                "pc-size-5 pc-duration-200",
                open && "pc-rotate-180",
              )}
            />
            <span className="pc-sr-only">Toggle</span>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent asChild className="pc-mt-3">
          <div className="pc-flex pc-flex-col pc-gap-6">
            <FormProvider {...form}>
              <CreatePurchaseFormView />
            </FormProvider>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export const Component = CreatePurchaseConfirmationPage;
