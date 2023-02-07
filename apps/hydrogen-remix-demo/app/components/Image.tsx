// Eases tailwindui template integration.
export function Image({
  priority,
  unoptimized,
  ...props
}: React.ComponentPropsWithoutRef<"img"> & {
  priority?: boolean;
  unoptimized?: boolean;
}) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
}
