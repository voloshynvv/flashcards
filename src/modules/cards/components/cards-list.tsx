"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { CardsListFilters } from "./cards-list-filters";
import { useFilters } from "../hooks/use-filters";

import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { CardItem } from "./card-item";

export const CardsList = () => {
  const { filters, updateFilters } = useFilters();

  const cardsQuery = useSuspenseInfiniteQuery(
    cardsInfiniteQueryOptions({
      categoryIds: filters.categoryIds,
      hideMastered: filters.hideMastered,
    }),
  );

  const cards = cardsQuery.data.pages.map((page) => page.cards).flat();

  if (cards.length === 0) {
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
        <CardsListFilters filters={filters} onChange={updateFilters} />
      </div>

      <div className="flex flex-col gap-10 md:gap-12">
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
    </div>
  );
};
