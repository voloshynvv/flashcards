import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/utils/cn";

const variants = {
  primary: "font-semibold bg-yellow-500 px-5",
  secondary: "bg-neutral-50 font-medium px-4",
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: keyof typeof variants;
  noShadow?: boolean;
  asChild?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  asChild,
  noShadow,
  ...props
}: ButtonProps) => {
  const Element = asChild ? Slot : "button";

  return (
    <Element
      className={cn(
        "inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full border transition-[box-shadow,background-color] disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4",
        noShadow && variant === "secondary" && "hover:bg-neutral-100",
        !noShadow &&
          "shadow-border-sm hover:shadow-border-lg focus-visible:shadow-border-lg! focus-visible:shadow-ring outline-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
};
