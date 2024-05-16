import React from "react";

interface Props {
  children: React.ReactNode;
}

export const FormSectionRow: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="pc-flex pc-flex-col lg:pc-grid pc-grid-flow-col pc-grid-cols-12 pc-gap-y-2 pc-gap-x-2">
      {children}
    </div>
  );
};
