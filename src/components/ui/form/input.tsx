import { cn } from "@/utils/cn";

export const Input = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      ref={ref}
      className={cn(
        "block h-13.5 w-full min-w-0 truncate rounded-md border p-4 font-normal transition-[box-shadow,border-color] placeholder:text-neutral-600 disabled:pointer-events-none disabled:opacity-50",
        "hover:shadow-border-sm focus-visible:shadow-border-sm! focus-visible:shadow-ring focus-visible:border-ring outline-none",
        "aria-invalid:shadow-border-sm aria-invalid:border-pink-700 aria-invalid:shadow-pink-700!",
        className,
      )}
      {...props}
    />
  );
};
