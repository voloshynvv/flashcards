"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/utils/cn";
import { Button } from "../button/button";

type RootProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

interface AlertDialogProps extends Pick<
  RootProps,
  "open" | "onOpenChange" | "defaultOpen"
> {
  trigger?: React.ReactNode;
  isPending?: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
  actionText: React.ReactNode;
  onCancel?: () => void;
  onConfirm: (e: React.MouseEvent) => void;
}

export const AlertDialog = ({
  open,
  onOpenChange,
  defaultOpen,
  trigger,
  title,
  description,
  actionText,
  onCancel,
  onConfirm,
  isPending,
}: AlertDialogProps) => {
  return (
    <AlertDialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {trigger && (
        <AlertDialogPrimitive.Trigger asChild>
          {trigger}
        </AlertDialogPrimitive.Trigger>
      )}

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-neutral-900/70" />

        <AlertDialogPrimitive.Content
          data-slot="alert-dialog-content"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-2xl border bg-neutral-50 p-6 duration-200 sm:max-w-150",
          )}
        >
          <AlertDialogPrimitive.Title className="mb-2 text-2xl font-semibold">
            {title}
          </AlertDialogPrimitive.Title>

          <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className="font-normal"
          >
            {description}
          </AlertDialogPrimitive.Description>

          <div className="-mx-6 mt-6 flex items-center justify-end gap-3 border-t px-6 pt-6">
            <AlertDialogPrimitive.Cancel asChild>
              <Button noShadow variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </AlertDialogPrimitive.Cancel>

            <AlertDialogPrimitive.Action asChild>
              <Button onClick={onConfirm} disabled={isPending}>
                {actionText}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};
