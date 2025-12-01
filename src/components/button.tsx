import { cn } from "@/utils/cn";

export const Button = (props: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-yellow-500 px-5 font-semibold",
      )}
      {...props}
    />
  );
};
