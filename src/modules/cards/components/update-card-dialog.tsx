import { Card } from "@/lib/queries/cards.query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardForm } from "./card-form";

interface UpdateCardDialogProps {
  card: Card;
  open: boolean;
  onOpenChange: () => void;
  onSubmit: () => void;
}

export const UpdateCardDialog = ({
  card,
  open,
  onOpenChange,
  onSubmit,
}: UpdateCardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title="Edit your card"
        description="Update the question and answer for your card. Make sure the information is clear and accurate to help with your learning"
      >
        <CardForm initialValues={card} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
