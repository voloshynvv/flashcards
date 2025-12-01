import { cn } from "@/utils/cn";

export const Input = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "block h-13.5 w-full min-w-0 truncate rounded-md border p-4 font-normal transition-[box-shadow,border-color] placeholder:text-neutral-600 disabled:pointer-events-none disabled:opacity-50",
        "hover:shadow-border-sm focus-visible:shadow-border-sm! focus-visible:shadow-ring focus-visible:border-ring outline-none",
        className,
      )}
      {...props}
    />
  );
};
