import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import React from "react";

function RadioGroupSmallCards({
  label,
  children,
  ...props
}: Parameters<typeof RadioGroup>[0] & {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <RadioGroup {...props}>
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{children}</div>
    </RadioGroup>
  );
}

RadioGroupSmallCards.SrLabel = function RadioGroupSmallCardSrLabel({children}: {children: React.ReactNode}) {
    return (
        <RadioGroup.Label className="sr-only">{children}</RadioGroup.Label>
    )
}

RadioGroupSmallCards.Option = function RadioGroupSmallCardsOption({
  name,
  value,
  disabled,
}: Parameters<typeof RadioGroup.Option>[0]) {
  return (
    <RadioGroup.Option
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
      <RadioGroup.Label as="span">{name}</RadioGroup.Label>
    </RadioGroup.Option>
  );
};

export { RadioGroupSmallCards }