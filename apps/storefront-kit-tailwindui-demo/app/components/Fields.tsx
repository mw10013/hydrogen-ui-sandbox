export function TextFieldSr({
  id,
  label,
  type = "text",
  ...props
}: { label: string } & React.ComponentPropsWithoutRef<"input">) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-indigo-500 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        {...props}
      />
    </>
  );
}
