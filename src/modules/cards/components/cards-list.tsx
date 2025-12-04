"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { cardsQueryOptions } from "@/lib/queries/cards.query";
import { CardsListFilters } from "./cards-list-filters";
import { useFilters } from "../hooks/use-filters";

import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { CardItem } from "./card-item";

export const CardsList = () => {
  const { filters, updateFilters } = useFilters();

  const cardsQuery = useSuspenseQuery(
    cardsQueryOptions({
      categoryIds: filters.categoryIds,
      hideMastered: filters.hideMastered,
    }),
  );

  if (cardsQuery.data.length === 0) {
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
          {cardsQuery.data.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>

        <Button className="mx-auto block" variant="secondary">
          Load More
        </Button>
      </div>
    </div>
  );
};
