"use client";

import {
  useSuspenseInfiniteQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { CardsListFilters } from "./cards-list-filters";
import { useFilters } from "../hooks/use-filters";

import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { CardItem } from "./card-item";
import { cn } from "@/utils/cn";

export const CardsList = () => {
  const { filters, updateFilters, resetFilters, filtersApplied } = useFilters();

  const cardsQuery = useInfiniteQuery(
    cardsInfiniteQueryOptions({
      categoryIds: filters.categoryIds,
      hideMastered: filters.hideMastered,
    }),
  );

  if (cardsQuery.isPending) {
    return <p>Pending...</p>;
  }

  if (cardsQuery.isError) {
    return <p>Error...</p>;
  }

  const cards = cardsQuery.data?.pages.map((page) => page.cards).flat();

  if (cards.length === 0 && !filtersApplied) {
    return (
      <Empty
        title="No cards yet"
        description="Add your first card using the form above and it will show up here."
      />
    );
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <CardsListFilters
          key={filters.categoryIds.length}
          filters={filters}
          onChange={updateFilters}
          onResetFilters={resetFilters}
          filtersApplied={filtersApplied}
        />
      </div>

      {cards.length === 0 ? (
        <Empty
          title="No cards match your filters"
          description="Try adjusting your filters or adding more cards."
        />
      ) : (
        <div
          className={cn(
            "flex flex-col gap-10 md:gap-12",
            cardsQuery.isPlaceholderData &&
              "pointer-events-none opacity-50 select-none",
          )}
        >
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>

          {cardsQuery.hasNextPage && (
            <Button
              className="mx-auto block"
              variant="secondary"
              onClick={() => cardsQuery.fetchNextPage()}
              disabled={!cardsQuery.hasNextPage || cardsQuery.isFetching}
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
