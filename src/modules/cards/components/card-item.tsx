import { EditIcon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { Card } from "@/lib/queries/cards.query";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { CardProgress } from "@/components/card-progress";
import { Tag } from "@/components/ui/tag";

interface CardItemProps {
  card: Card;
  onActionClick: (action: string) => void;
}

const actions = [
  { id: "update", label: "Edit", icon: EditIcon },
  { id: "delete", label: "Delete", icon: Trash2Icon },
];

export const CardItem = ({ card, onActionClick }: CardItemProps) => {
  return (
    <article className="shadow-border-md flex flex-col divide-y rounded-2xl border bg-neutral-50">
      <div className="p-4">
        <h2 className="text-xl font-semibold">{card.question}</h2>
      </div>

      <div className="flex-1 p-4">
        <p className="mb-1.5 text-sm opacity-60">Answer:</p>
        <p className="text-sm">{card.answer}</p>
      </div>

      <div className="flex items-center divide-x">
        <div className="flex p-3">
          <Tag className="inline-block max-w-32.5 truncate">
            {card.category}
          </Tag>
        </div>

        <div className="flex flex-1 items-center self-stretch p-3">
          <CardProgress value={card.knownCount} />
        </div>

        <div className="p-3">
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
                onClick={() => onActionClick(action.id)}
              >
                <action.icon />
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        </div>
      </div>
    </article>
  );
};
