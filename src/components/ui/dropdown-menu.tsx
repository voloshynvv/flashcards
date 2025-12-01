import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "lucide-react";

import { cn } from "@/utils/cn";

type DropdownMenuRootProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;

type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;

interface DropdownMenuProps
  extends
    DropdownMenuContentProps,
    Pick<
      DropdownMenuRootProps,
      "onOpenChange" | "open" | "defaultOpen" | "modal"
    > {
  trigger: React.ReactNode;
}

export const DropdownMenu = ({
  trigger,
  open,
  defaultOpen,
  modal,
  onOpenChange,
  sideOffset = 8,
  ...props
}: DropdownMenuProps) => {
  return (
    <DropdownMenuPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      modal={modal}
      onOpenChange={onOpenChange}
    >
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-35 divide-y overflow-x-hidden overflow-y-auto rounded-lg border bg-neutral-50 shadow-sm",

            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",

            "max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)",
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export const DropdownMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) => {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex h-9 items-center gap-2 px-4 py-2 text-sm outline-none select-none data-highlighted:bg-neutral-100 [&>svg]:size-4",
        className,
      )}
      {...props}
    />
  );
};

export const DropdownMenuCheckboxItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        "group relative flex h-9 items-center gap-2 px-4 py-2 pl-10 text-sm outline-none select-none data-highlighted:bg-neutral-100 [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <span
        className={
          "pointer-events-none absolute left-4 flex size-4 items-center justify-center rounded-sm border bg-neutral-50 group-aria-checked:bg-yellow-500"
        }
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-3" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};
