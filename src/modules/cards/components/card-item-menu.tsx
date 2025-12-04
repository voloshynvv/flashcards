import { useState } from "react";
import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";
import { Card } from "@/lib/queries/cards.query";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardForm } from "./card-form";

interface CardItemMenuProps {
  card: Card;
}

export const CardItemMenu = ({ card }: CardItemMenuProps) => {
  const [dialog, setDialog] = useState<"delete" | "edit" | null>(null);

  return (
    <>
      <DropdownMenu
        align="end"
        side="top"
        sideOffset={20}
        trigger={
          <IconButton>
            <EllipsisVertical />
            <span className="sr-only">open menu</span>
          </IconButton>
        }
      >
        <DropdownMenuItem onClick={() => setDialog("edit")}>
          <EditIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenu>

      <Dialog open={dialog === "edit"} onOpenChange={() => setDialog(null)}>
        <DialogContent
          title="Edit your card"
          description="Update the question and answer for your card. Make sure the information is clear and accurate to help with your learning"
        >
          <CardForm
            initialValues={card}
            onSubmit={() => {
              setDialog(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
