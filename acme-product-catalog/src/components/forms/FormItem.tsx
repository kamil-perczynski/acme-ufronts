/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useId } from "react";
import { Input, Label } from "@acme/acme-ds";
import styles from "./FormItem.module.css";
import {
  Controller,
  ControllerRenderProps,
  UseControllerProps,
} from "react-hook-form";
import clsx from "clsx";

interface Props {
  className?: string;
  error?: string;
  label?: string;
  description?: string | React.ReactNode;
  input:
    | React.ReactNode
    | ((
        props: ControllerRenderProps<any, any> & Record<string, unknown>
      ) => React.ReactNode);
  inputProps: FieldSpec;
  showErrors?: boolean;
}

export const FormItem: React.FC<Props> = memo((props) => {
  const {
    className,
    label,
    description,
    input,
    inputProps,
    showErrors = true,
  } = props;

  const formItemId = useId() + "-field";
  const errorId = formItemId + "-err";
  const descriptionId = formItemId + "-desc";

  return (
    <Controller
      name={inputProps.name}
      rules={inputProps.rules}
      render={({ field, fieldState }) => (
        <div className={clsx(styles.formItem, className)}>
          {label && (
            <Label
              data-required={inputProps.rules?.required === true}
              className={
                "pc-text-sm " +
                (fieldState.invalid ? "ds-text-destructive" : undefined)
              }
              htmlFor={formItemId}
            >
              {label}
            </Label>
          )}

          {(() => {
            const fieldProps = {
              ...field,
              "aria-invalid": fieldState.invalid,
              "aria-describedby": [
                description && descriptionId,
                fieldState.invalid && errorId,
              ]
                .filter((it) => Boolean(it))
                .join(" "),
            };

            if (!input) {
              return <Input {...fieldProps} placeholder={label} />;
            }

            if (typeof input === "function") {
              return input(fieldProps);
            }

            return React.cloneElement(input as any, fieldProps);
          })()}

          {description && (
            <span
              id={descriptionId}
              className="pc-text-[.8rem] pc-text-muted-foreground"
            >
              {description}
            </span>
          )}

          {showErrors && fieldState.error && (
            <p
              id={errorId}
              className={"pc-text-[.8rem] pc-font-medium pc-text-destructive"}
            >
              {fieldState.error.message
                ? fieldState.error.message
                : toErrorMessage(fieldState.error.type)}
            </p>
          )}
        </div>
      )}
    />
  );
});

export interface FieldSpec {
  name: string;
  rules: UseControllerProps["rules"];
}

// eslint-disable-next-line react-refresh/only-export-components
export function field(
  name: string,
  rules?: UseControllerProps["rules"]
): FieldSpec {
  return { name, rules };
}

function toErrorMessage(errorType: string): string | undefined {
  switch (errorType) {
    case "required":
      return undefined;
    case "pattern":
      return "Field needs to meet the pattern";
    case "otp":
      return "OTP is invalid";
    case "minLength":
    case "maxLength":
      return "Min 6 characters are needed";
    default:
      return errorType;
  }
}
