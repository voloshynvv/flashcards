import { Card } from "@/lib/queries/cards.query";

import { CardProgress } from "@/components/shared/card-progress";
import { Tag } from "@/components/ui/feedback/tag";
import { CardItemDropdown } from "./card-item-dropdown";

interface CardItemProps {
  card: Card;
}

export const CardItem = ({ card }: CardItemProps) => {
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
          <CardItemDropdown card={card} />
        </div>
      </div>
    </article>
  );
};
