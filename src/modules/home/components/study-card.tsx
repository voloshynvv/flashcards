"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card } from "@/lib/queries/cards.query";

import { StudyCardItem } from "./study-card-item";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";

interface StudyCardProps {
  card: Card | null;
  filtersSlot?: React.ReactNode;
  cardActionsSlot?: React.ReactNode;
  totalCards: number;
  step: number;
  filtersApplied?: boolean;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

export const StudyCard = ({
  card,
  filtersApplied,
  totalCards,
  step,
  nextDisabled,
  prevDisabled,
  filtersSlot,
  cardActionsSlot,
  onPrev,
  onNext,
}: StudyCardProps) => {
  return (
    <div className="divide-y rounded-2xl border bg-neutral-50">
      {filtersSlot && <div className="px-4 py-3 md:p-5">{filtersSlot}</div>}

      {!card && !filtersApplied && <NoCardView />}
      {!card && filtersApplied && <MasteredAllView />}
      {card && (
        <>
          <div className="flex flex-col gap-5 px-4 py-6 md:p-5">
            <StudyCardItem card={card} />

            {cardActionsSlot}
          </div>

          <div className="flex flex-wrap items-center gap-4 p-4 md:flex-row md:p-5">
            <Button
              className="flex-1 md:flex-auto md:grow-0"
              onClick={onPrev}
              variant="secondary"
              noShadow
              disabled={prevDisabled}
            >
              <ChevronLeftIcon />
              <span>Previous</span>
            </Button>

            <p className="-order-1 flex-[0_1_100%] text-center text-sm text-neutral-600 md:order-0 md:flex-auto">
              Card {step + 1} of {totalCards}
            </p>

            <Button
              className="flex-1 md:flex-auto md:grow-0"
              onClick={onNext}
              variant="secondary"
              disabled={nextDisabled}
              noShadow
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

const NoCardView = () => {
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
