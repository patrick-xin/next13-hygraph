import cn from "clsx";

export const Column = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn("my-6 md:my-12 p-2 col-span-full lg:p-0 lg:col-span-4", [
        className && className,
      ])}
    >
      {children}
    </div>
  );
};
