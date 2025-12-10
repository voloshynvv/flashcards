import { useState } from "react";
import { EditIcon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { Card } from "@/lib/queries/cards.query";
import { useUpdateCard } from "@/lib/mutations/update-card.mutation";
import { useDeleteCard } from "@/lib/mutations/delete-card.mutation";
import { createToast } from "@/components/ui/feedback/toast";

import { IconButton } from "@/components/ui/button/icon-button";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { AlertDialog } from "@/components/ui/dialog/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog/dialog";
import { CardForm } from "./card-form";

const actions = [
  { id: "update", label: "Edit", icon: EditIcon },
  { id: "delete", label: "Delete", icon: Trash2Icon },
] as const;

type Dialog = (typeof actions)[number]["id"];

interface CardItemDropdownProps {
  card: Card;
}

export const CardItemDropdown = ({ card }: CardItemDropdownProps) => {
  const [activeDialog, setActiveDialog] = useState<Dialog | null>(null);

  const deleteCard = useDeleteCard({
    onSuccess: () => {
      createToast("The card is gone ✨");
    },
    onError: () => {
      createToast("Something went wrong.");
    },
  });

  const updateCard = useUpdateCard({
    onSuccess: () => {
      createToast("The card has been updated ✨");
      closeDialog();
    },
  });

  const closeDialog = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <DropdownMenu
        align="end"
        side="top"
        sideOffset={20}
        trigger={
          <IconButton>
            <EllipsisVerticalIcon />
            <span className="sr-only">open menu</span>
          </IconButton>
        }
      >
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.id}
            onClick={() => setActiveDialog(action.id)}
          >
            <action.icon />
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>

      <AlertDialog
        open={activeDialog === "delete"}
        onOpenChange={closeDialog}
        title="Delete this card?"
        description="This action can’t be undone."
        isPending={deleteCard.isPending}
        actionText="Delete Card"
        onConfirm={(e) => {
          e.preventDefault();
          deleteCard.mutate(card.id);
        }}
      />

      <Dialog open={activeDialog === "update"} onOpenChange={closeDialog}>
        <DialogContent
          title="Edit your card"
          description="Update the question and answer for your card. Make sure the information is clear and accurate to help with your learning"
        >
          <CardForm
            initialValues={card}
            onSubmit={(values) =>
              updateCard.mutate({ id: card.id, data: values })
            }
            hasError={updateCard.isError}
            isLoading={updateCard.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
