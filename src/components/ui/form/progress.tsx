import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils/cn";

export const Progress = ({
  className,
  value,
  max = 100,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) => {
  const percentage =
    max && max > 0 ? Math.min(100, ((value ?? 0) / max) * 100) : 0;

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full border bg-neutral-50",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-neutral-900 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
