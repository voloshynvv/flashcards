import { EllipsisVertical } from "lucide-react";
import { Card } from "./types";
import { Progress } from "@/components/ui/progress";
import { CardItemMenu } from "./card-item-menu";

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
        <div className="p-3">
          <p className="card border-r-3 border-b-3 px-3 py-1.5 text-xs">
            Web Development
          </p>
        </div>

        <div className="flex flex-1 items-center self-stretch p-3">
          <div className="flex items-center gap-2">
            <Progress className="w-15" />
            <p className="text-xs">0/5</p>
          </div>
        </div>

        <div className="p-3">
          <CardItemMenu />
        </div>
      </div>
    </article>
  );
};
