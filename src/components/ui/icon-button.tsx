import { cn } from "@/utils/cn";

export const IconButton = ({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "hover:shadow-border-sm hover:border-border inline-flex size-6 shrink-0 items-center justify-center rounded-sm border border-transparent transition-[box-shadow,border-color] [&>svg]:size-4",
        "focus-visible:shadow-border-md! focus-visible:border-border focus-visible:shadow-ring outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
