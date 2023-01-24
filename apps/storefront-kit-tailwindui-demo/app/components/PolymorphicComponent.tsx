import React from "react";
import clsx from "clsx";

// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
// https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/

type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof (Props & AsProp<C>)>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentPropsWithoutRef<C, Props> & { ref?: PolymorphicRef<C> };

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type PolymorphicTextProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, { color?: Rainbow | "black" }>;

type PolymorphicTextComponent = <C extends React.ElementType = "span">(
  props: PolymorphicTextProps<C>
) => React.ReactElement | null;

export const PolymorphicText: PolymorphicTextComponent = React.forwardRef(
  function PolymorphicTextComponent<C extends React.ElementType = "span">(
    { as, color, children, ...props }: PolymorphicTextProps<C>,
    ref?: PolymorphicRef<C>
  ) {
    const Component = as || "span";
    const style = color ? { style: { color } } : {};
    return (
      <Component {...style} {...props} ref={ref}>
        {children}
      </Component>
    );
  }
);

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

type PolymorphicButtonProps<
  C extends React.ElementType,
  V extends keyof typeof variantStyles
> = PolymorphicComponentPropsWithRef<
  C,
  { variant?: V; color?: keyof (typeof variantStyles)[V]; className?: string }
>;

type PolymorphicButtonComponent = <
  C extends React.ElementType = "button",
  //   C extends React.ElementType,
  V extends keyof typeof variantStyles = "solid"
  //   V extends keyof typeof variantStyles
>(
  props: PolymorphicButtonProps<C, V>
) => React.ReactElement | null;

export const PolymorphicButton: PolymorphicButtonComponent = React.forwardRef(
  function PolymorphicButtonComponent<
    C extends React.ElementType,
    V extends keyof typeof variantStyles
  >(
    { as, variant, color, className, ...props }: PolymorphicButtonProps<C, V>,
    ref?: PolymorphicRef<C>
  ) {
    const Component = as || "button";
    // variant = variant ?? "solid";
    const variantIndex = variant ?? "solid";
    // color = color ?? "gray";
    const colorIndex = color ?? "gray";

    className = clsx(
      //   baseStyles[variant],
      baseStyles[variantIndex],
      //   variantStyles[variant][color],
      // @ts-ignore
      variantStyles[variantIndex][colorIndex],
      className
    );

    return <Component ref={ref} className={className} {...props} />;
  }
);
