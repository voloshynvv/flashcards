import { cn } from "@/utils/cn";

export const Label = ({
  className,
  ...props
}: React.ComponentProps<"label">) => {
  return <label className={cn("block leading-5", className)} {...props} />;
};
