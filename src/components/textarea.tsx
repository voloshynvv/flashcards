import { cn } from "@/utils/cn";

export const Textarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className={cn(
        "block min-h-25 w-full resize-none rounded-md border p-4 font-normal placeholder:text-neutral-600",
        className,
      )}
      {...props}
    />
  );
};
