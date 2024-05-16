import React, {
  Children,
  DetailedReactHTMLElement,
  HtmlHTMLAttributes,
  forwardRef,
} from "react";
import styles from "./TableInput.module.css";
import clsx from "clsx";

type AnyChild = DetailedReactHTMLElement<
  HtmlHTMLAttributes<unknown>,
  HTMLElement
>;

type TableInputProps = JSX.IntrinsicElements["input"] & {
  children?: React.ReactNode;
};

export const TableInput = forwardRef<HTMLInputElement, TableInputProps>(
  (props, ref) => {
    const { className: classNameProp, children, ...rest } = props;

    const className = clsx(styles.tableInput, classNameProp);

    if (children) {
      return Children.map(children, (child) => {
        return React.cloneElement(child as AnyChild, {
          ref,
          className,
          ...rest,
        });
      });
    }

    return <input className={className} ref={ref} {...rest} />;
  },
);
