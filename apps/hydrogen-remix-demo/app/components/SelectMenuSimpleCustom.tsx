import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";

// https://tailwindui.com/components/application-ui/forms/select-menus
// Simple custom
export function SelectMenuSimpleCustom({
  value,
  displayValue,
  children,
  ...props
}: Parameters<typeof Listbox>[0] & {
  displayValue: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Listbox {...props} value={value}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label> */}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{displayValue}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

SelectMenuSimpleCustom.Label = function SelectMenuSimpleCustomLabel({
  children,
}: Omit<Parameters<typeof Listbox.Label>[0], "className">) {
  return (
    <Listbox.Label className="block text-sm font-medium text-gray-700">
      {children}
    </Listbox.Label>
  );
};

SelectMenuSimpleCustom.Option = function SelectMenuSimpleCustomOption({
  value,
  children,
  ...props
}: Omit<Parameters<typeof Listbox.Option>[0], "className"> & {
  children: React.ReactNode;
}) {
  return (
    <Listbox.Option
      {...props}
      value={value}
      className={({ active }) =>
        clsx(
          active ? "text-white bg-indigo-600" : "text-gray-900",
          "relative cursor-default select-none py-2 pl-3 pr-9"
        )
      }
    >
      {({ selected, active }) => (
        <>
          <span
            className={clsx(
              selected ? "font-semibold" : "font-normal",
              "block truncate"
            )}
          >
            {children}
          </span>

          {selected ? (
            <span
              className={clsx(
                active ? "text-white" : "text-indigo-600",
                "absolute inset-y-0 right-0 flex items-center pr-4"
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};
