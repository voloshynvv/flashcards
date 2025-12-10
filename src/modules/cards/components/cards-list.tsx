import { Empty } from "@/components/ui/feedback/empty";
import { Card } from "@/lib/queries/cards.query";
import { cn } from "@/utils/cn";
import { CardItem } from "./card-item";
import { Button } from "@/components/ui/button/button";

interface CardsListProps {
  cards: Card[];
  hasNextPage?: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
}

export const CardsList = ({
  cards,
  hasNextPage,
  isLoading,
  onLoadMore,
}: CardsListProps) => {
  if (cards.length === 0) {
    return (
      <Empty
        title="No cards match your filters"
        description="Try adjusting your filters or adding more cards."
      />
    );
  }

  return (
    <div className={cn("flex flex-col gap-10 md:gap-12")}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>

      {hasNextPage && (
        <Button
          className="mx-auto block"
          variant="secondary"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          Load More
        </Button>
      )}
    </div>
  );
};
