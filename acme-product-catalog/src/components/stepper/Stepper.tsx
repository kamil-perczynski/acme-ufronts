import { Separator } from "@acme/acme-ds";
import clsx from "clsx";
import React from "react";

interface Props {
  items: string[];
  activeItem: number;
}

export const Stepper: React.FC<Props> = (props) => {
  const { items, activeItem } = props;

  return (
    <div>
      <div
        style={{ gridTemplateColumns: `repeat(${items.length * 2 - 2}, 1fr)` }}
        className="pc-grid pc-gap-3 pc-shrink-0 pc-text-xs pc-mb-1 pc-font-medium"
      >
        {items.map((item, i) => (
          <span
            key={item}
            className={clsx(
              i === items.length - 1 && "pc-text-right",
              i > 0 && i !== items.length - 1 && "pc-text-center pc-col-span-2",
            )}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="pc-flex pc-flex-row pc-items-center pc-gap-0 pc-shrink-0 pc-relative">
        {items.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && (
              <Separator
                className={clsx(
                  "pc-w-min pc-flex-grow pc-h-0.5 pc-shrink-0",
                  i <= activeItem && "pc-bg-accent",
                )}
              />
            )}
            <div
              className={clsx(
                "pc-size-3 pc-rounded-full pc-shrink-0",
                i <= activeItem ? "pc-bg-accent" : "pc-bg-border",
                i === 0 && "pc-absolute",
                i === items.length - 1 &&
                  "pc-absolute pc-left-full -pc-translate-x-3",
              )}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
