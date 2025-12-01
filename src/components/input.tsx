import { cn } from "@/utils/cn";

export const Input = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "block h-13.5 w-full min-w-0 truncate rounded-md border p-4 font-normal placeholder:text-neutral-600",
        className,
      )}
      {...props}
    />
  );
};
