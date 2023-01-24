import clsx from "clsx";
import { missingClass } from "~/lib/utils";
import { Heading } from "./Heading";

export function Section({
  as: Component = "section",
  children,
  className,
  divider = "none",
  display = "grid",
  heading,
  padding = "all",
  ...props
}: {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  divider?: "none" | "top" | "bottom" | "both";
  display?: "grid" | "flex";
  heading?: string;
  padding?: "x" | "y" | "swimlane" | "all";
  [key: string]: any;
}) {
  const paddings = {
    x: "px-6 md:px-8 lg:px-12",
    y: "py-6 md:py-8 lg:py-12",
    swimlane: "pt-4 md:pt-8 lg:pt-12 md:pb-4 lg:pb-8",
    all: "p-6 md:p-8 lg:p-12",
  };

  const dividers = {
    none: "border-none",
    top: "border-t border-primary/05",
    bottom: "border-b border-primary/05",
    both: "border-y border-primary/05",
  };

  const displays = {
    flex: "flex",
    grid: "grid",
  };

  return (
    <Component
      {...props}
      className={clsx(
        "w-full gap-4 md:gap-8",
        displays[display],
        missingClass(className, "\\mp[xy]?-") && paddings[padding],
        dividers[divider],
        className
      )}
    >
      {heading && (
        <Heading size="lead" className={padding === "y" ? paddings["x"] : ""}>
          {heading}
        </Heading>
      )}
      {children}
    </Component>
  );
}
