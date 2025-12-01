import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/utils/cn";

const variants = {
  primary: "font-semibold bg-yellow-500 px-5",
  secondary: "bg-neutral-50 font-medium px-4",
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: keyof typeof variants;
  asChild?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  asChild,
  ...props
}: ButtonProps) => {
  const Element = asChild ? Slot : "button";

  return (
    <Element
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full border [&>svg]:size-4",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
};
