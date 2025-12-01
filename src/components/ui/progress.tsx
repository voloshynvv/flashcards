import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils/cn";

export const Progress = ({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) => {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full border bg-neutral-50",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
