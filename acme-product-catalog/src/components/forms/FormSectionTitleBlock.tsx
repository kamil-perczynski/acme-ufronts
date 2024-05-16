import React from "react";

interface Props {
  title: string;
  description?: string;
  className?: string;
}

export const FormSectionTitleBlock: React.FC<Props> = (props) => {
  const { title, description, className } = props;
  return (
    <div className={"pc-col-span-3 lg:pc-pr-12 " + className}>
      <span className="pc-block pc-font-medium pc-text-primary/90 pc-mb-1">
        {title}
      </span>

      {description && (
        <span className="pc-block pc-text-[.8rem] pc-text-primary/60">
          {description}
        </span>
      )}
    </div>
  );
};
