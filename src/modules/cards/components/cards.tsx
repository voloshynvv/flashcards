"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { useFilters } from "../hooks/use-filters";

import { Empty } from "@/components/ui/feedback/empty";
import { Filters } from "@/components/shared/filters";
import { Loader } from "@/components/ui/feedback/loader";
import { CardsList } from "./cards-list";

export const Cards = () => {
  const { filters, updateFilters, resetFilters, filtersApplied } = useFilters();

  const cardsQuery = useInfiniteQuery({
    ...cardsInfiniteQueryOptions({
      categoryIds: filters.categoryIds,
      hideMastered: filters.hideMastered,
    }),
    select: (data) => data.pages.flatMap((page) => page.cards),
  });

  if (cardsQuery.isPending) {
    return <Loader className="size-8" />;
  }

  if (cardsQuery.isError) {
    return (
      <Empty
        title="Something went wrong"
        description="Couldn’t load your flash cards. Please try again later."
      />
    );
  }

  if (cardsQuery.data.length === 0 && !filtersApplied) {
    return (
      <Empty
        title="No cards yet"
        description="Add your first card using the form above and it will show up here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <Filters
        key={filtersApplied ? "with-filters" : "without-filters"}
        filters={filters}
        onChange={updateFilters}
        shouldShowResetButton={filtersApplied}
        onReset={resetFilters}
      />

      <CardsList
        cards={cardsQuery.data}
        onLoadMore={cardsQuery.fetchNextPage}
        hasNextPage={cardsQuery.hasNextPage}
        isLoading={cardsQuery.isFetching}
      />
    </div>
  );
};
