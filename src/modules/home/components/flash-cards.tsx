"use client";

import { useState } from "react";
import Link from "next/link";
import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RotateCcwIcon,
  ShuffleIcon,
} from "lucide-react";

import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { FlashCard } from "./flash-card";
import { Filters } from "@/components/filters";
import { CardsFilters } from "@/lib/validators/cards-search-params.schema";
import { useLearnCard } from "@/lib/mutations/learn-card.mutation";
import { createToast } from "@/components/ui/toast";
import { useResetProgress } from "@/lib/mutations/reset-progress.mutation";

const defaultFilters = {
  categoryIds: [],
  hideMastered: false,
};

export const FlashCards = () => {
  const [step, setStep] = useState(0);
  const [filters, setFilters] = useState<CardsFilters>(defaultFilters);

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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

  const learnCard = useLearnCard();
  const resetProgress = useResetProgress();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const { cards, currentPage, itemsPerPage, totalItems } = data;

  const hasNext = step < totalItems - 1;
  const hasPrev = step > 0;
  const offset = itemsPerPage * currentPage - 1;

  const currentCard = cards[step];
  const mastered = currentCard?.knownCount === 5;

  const filtersApplied =
    filters.categoryIds.length > 0 ||
    filters.hideMastered !== defaultFilters.hideMastered;

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
    const prefetchThreshold = offset - 2; // 2 item before the last

    if (step === prefetchThreshold) {
      fetchNextPage();
    }

    if (hasNext) {
      setStep(step + 1);
    }
  };

  const handleLearnCard = () => {
    learnCard.mutate(currentCard.id, {
      onSuccess: () => {
        createToast("🎉 Great job! You’ve learned this card!");

        setTimeout(() => {
          // setStep(step + 1);
        }, 200);
      },
      onError: () => {
        createToast("😅 Hmm, something went wrong. Give it another try!");
      },
    });
  };

  const handleResetProgress = () => {
    if (currentCard.knownCount === 0) {
      createToast(
        "💡 You haven’t started learning this card yet. Let’s give it a go!",
      );
      return;
    }

    resetProgress.mutate(currentCard.id, {
      onSuccess: () => {
        createToast(
          "🔄 All set! Progress has been reset. Ready to start fresh?",
        );

        setTimeout(() => {
          // setStep(step + 1);
        }, 200);
      },
      onError: () => {
        createToast(
          "😕 Oops! Couldn’t reset the progress. Try again in a moment.",
        );
      },
    });
  };

  return (
    <div className="divide-y rounded-2xl border bg-neutral-50">
      <div className="px-4 py-3 md:p-5">
        <Filters filters={filters} onChange={handleChangeFilters}>
          <Button variant="secondary" noShadow onClick={() => {}}>
            <ShuffleIcon />
            Shuffle
          </Button>
        </Filters>
      </div>

      {cards.length === 0 && !filtersApplied && <NoCardsView />}
      {cards.length === 0 && filtersApplied && <MasteredAllView />}
      {cards.length !== 0 && (
        <>
          <div className="flex flex-col gap-5 px-4 py-6 md:p-5">
            <div>
              <FlashCard card={currentCard} />
            </div>

            <div className="flex flex-col items-center justify-center gap-2.5 md:flex-row md:gap-5">
              <Button
                className="w-full md:w-fit"
                onClick={handleLearnCard}
                disabled={mastered || learnCard.isPending}
              >
                <CheckCircleIcon />
                {mastered ? "Already Mastered" : "I Know This"}
              </Button>

              <Button
                onClick={handleResetProgress}
                className="w-full md:w-fit"
                variant="secondary"
                disabled={resetProgress.isPending}
              >
                <RotateCcwIcon />
                Reset Progress
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 p-4 md:flex-row md:p-5">
            <Button
              className="flex-1 md:flex-auto md:grow-0"
              onClick={handlePrev}
              variant="secondary"
              noShadow
              disabled={!hasPrev}
            >
              <ChevronLeftIcon />
              <span>Previous</span>
            </Button>

            <p className="-order-1 flex-[0_1_100%] text-center text-sm text-neutral-600 md:order-0 md:flex-auto">
              Card {step + 1} of {totalItems}
            </p>

            <Button
              className="flex-1 md:flex-auto md:grow-0"
              onClick={handleNext}
              variant="secondary"
              noShadow
              disabled={!hasNext || (isFetchingNextPage && step === offset)}
            >
              <span>Next</span>
              <ChevronRightIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const NoCardsView = () => {
  return (
    <Empty
      muted
      title="No cards to study"
      description="You don’t have any cards yet. Add your first card in the All Cards tab."
    >
      <Button variant="secondary" asChild>
        <Link href="/cards">Go to All Cards</Link>
      </Button>
    </Empty>
  );
};

const MasteredAllView = () => {
  return (
    <Empty
      muted
      title="You’re all caught up!"
      description="All your cards are mastered. Turn off “Hide mastered” to see them again."
    />
  );
};
