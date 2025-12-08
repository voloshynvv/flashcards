"use client";

import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { statisticsQueryOptions } from "@/lib/queries/statistics.query";
import { CardsFilters } from "@/lib/validators/cards-search-params.schema";

import { Overview } from "../overview";
import { StudyCard } from "../study-card";
import { CardActions } from "./card-actions";
import { Filters } from "@/components/filters";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/ui/loader";

export const UserHome = () => {
  const [step, setStep] = useState(0);
  const [filters, setFilters] = useState<CardsFilters>(defaultFilters);

  const filtersApplied =
    filters.categoryIds.length > 0 ||
    filters.hideMastered !== defaultFilters.hideMastered;

  const statisticsQuery = useQuery(statisticsQueryOptions());
  const cardsQuery = useInfiniteQuery({
    ...cardsInfiniteQueryOptions(filters),
    select: (data) => {
      const cards = data.pages.flatMap((page) => page.cards);
      const { totalItems, totalPages, itemsPerPage } = data.pages[0];

      return {
        cards,
        totalPages,
        totalItems,
        currentPage: data.pageParams.length,
        itemsPerPage,
      };
    },
  });

  const isPending = cardsQuery.isPending || statisticsQuery.isPending;
  const isError = cardsQuery.isError || statisticsQuery.isError;

  if (isPending) {
    return <Loader className="size-6" />;
  }

  if (isError) {
    return (
      <Empty
        title="Oops! Something went wrong while loading your cards."
        description="Please try again — we’ll get you back to studying!"
      />
    );
  }

  const { cards, currentPage, itemsPerPage, totalItems } = cardsQuery.data;

  const currentCard = cards[step];
  const hasNext = step < totalItems - 1;
  const hasPrev = step > 0;
  const offset = itemsPerPage * currentPage - 1;

  const handleChangeFilters = (newFilters: CardsFilters) => {
    setFilters(newFilters);
    setStep(0);
  };

  const handlePrev = () => {
    if (hasPrev) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    const prefetchThreshold = offset - 2; // 2 items before the end

    if (step === prefetchThreshold) {
      cardsQuery.fetchNextPage();
    }

    if (hasNext) {
      setStep(step + 1);
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[3fr_1.5fr] lg:gap-8">
      <StudyCard
        card={currentCard}
        step={step}
        totalCards={totalItems}
        filtersSlot={
          <Filters filters={filters} onChange={handleChangeFilters} />
        }
        cardActionsSlot={<CardActions card={currentCard} />}
        filtersApplied={filtersApplied}
        nextDisabled={
          !hasNext || (cardsQuery.isFetchingNextPage && step === offset)
        }
        prevDisabled={!hasPrev}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {statisticsQuery.data && (
        <div>
          <Overview
            inProgressCount={statisticsQuery.data.inProgress}
            masteredCount={statisticsQuery.data.mastered}
            notStartedCount={statisticsQuery.data.notStarted}
            totalCards={statisticsQuery.data.totalCards}
          />
        </div>
      )}
    </div>
  );
};

const defaultFilters = {
  categoryIds: [],
  hideMastered: false,
};
