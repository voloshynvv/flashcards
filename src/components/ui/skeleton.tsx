import { cn } from "@/utils/cn";

export const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-neutral-100", className)}
      {...props}
    />
  );
};
