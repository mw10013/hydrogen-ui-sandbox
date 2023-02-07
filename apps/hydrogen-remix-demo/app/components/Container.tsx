import clsx from "clsx";

export function Container({
  className,
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8")}>
      {children}
    </div>
  );
}
