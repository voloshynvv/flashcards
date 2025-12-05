import { CardProgress } from "@/components/card-progress";
import { Tag } from "@/components/ui/tag";
import { Card } from "@/lib/queries/cards.query";

interface FlashCardProps {
  card: Card;
}

export const FlashCard = ({ card }: FlashCardProps) => {
  return (
    <button className="shadow-border-sm relative flex flex-col items-center gap-4 rounded-2xl border bg-pink-400 px-4 py-5 text-center md:p-6">
      <Tag>{card.category}</Tag>

      <div className="w-full space-y-3 py-19">
        <p className="text-2xl font-bold text-balance md:text-[2rem] lg:text-[2.5rem]">
          {card.question}
        </p>
        <p className="opacity-80"> Click to reveal answer</p>
      </div>

      <div className="grid min-h-8 place-content-center">
        <CardProgress value={card.knownCount} />
      </div>
    </button>
  );
};
