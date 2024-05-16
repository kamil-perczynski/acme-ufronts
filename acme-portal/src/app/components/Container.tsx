import { cn } from "~/lib/utils";

type Props = {} & JSX.IntrinsicElements["div"];

export const Container: React.FC<Props> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cn(
        "w-full max-w-[calc(100vw-1.5rem)] lg:max-w-[696px] xl:max-w-[962px] 2xl:max-w-[1080px] mx-auto p-4 md:p-8 lg:p-4",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
