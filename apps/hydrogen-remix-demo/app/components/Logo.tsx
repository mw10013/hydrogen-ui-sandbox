export function Logo({ className }: { className?: string }) {
  return (
    <img
      className={className ?? "h-8 w-auto"}
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt=""
    />
  );
}
