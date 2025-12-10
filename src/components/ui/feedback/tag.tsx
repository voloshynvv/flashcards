import { cn } from "@/utils/cn";

export const Tag = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "shadow-border-xs inline-flex w-fit items-center gap-1.5 rounded-full border border-r-3 border-b-3 bg-neutral-50 px-3 py-1.5 text-xs",
        className,
      )}
      {...props}
    />
  );
};
