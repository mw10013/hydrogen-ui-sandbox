import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

// https://tailwindui.com/components/application-ui/forms/radio-groups
// Small Card

export function RadioGroupSmallCards({
  value,
  srLabel,
  children,
  ...props
}: Parameters<typeof RadioGroup>[0] & {
  srLabel: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <RadioGroup {...props} value={value}>
      <RadioGroup.Label className="sr-only">{srLabel}</RadioGroup.Label>
      {children}
    </RadioGroup>
  );
}

RadioGroupSmallCards.Option = function RadioGroupSmallCardsOption({
  value,
  disabled,
  children,
  ...props
}: Omit<Parameters<typeof RadioGroup.Option>[0], "className"> & {
  children: React.ReactNode;
}) {
  return (
    <RadioGroup.Option
      {...props}
      value={value}
      className={({ active, checked }) =>
        clsx(
          disabled
            ? "opacity-25 cursor-not-allowed"
            : "cursor-pointer focus:outline-none",
          active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
          checked
            ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
            : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
          "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
        )
      }
      disabled={disabled}
    >
      {children}
    </RadioGroup.Option>
  );
};
