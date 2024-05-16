import React from "react";

interface Props {
  children: React.ReactNode;
}

export const FormSection: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="pc-grid pc-grid-cols-1 pc-gap-y-8 lg:pc-gap-0 lg:pc-grid-cols-12 pc-border-b pc-pb-8">
      {children}
    </div>
  );
};
