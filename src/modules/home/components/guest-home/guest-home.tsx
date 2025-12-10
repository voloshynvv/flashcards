"use client";

import { useState } from "react";
import { filterCards, guestCards, categories } from "./guest-home.helpers";

import { StudyCard } from "../study-card";
import { Overview } from "../overview";
import { GuestCategories } from "./guest-categories";
import { Alert } from "@/components/ui/feedback/alert";

export const GuestHome = () => {
  const [step, setStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCards = filterCards(guestCards, selectedCategories);
  const currentCard = filteredCards[step];

  const hasNext = step < filteredCards.length - 1;

  const handlePrev = () => {
    setStep(Math.max(0, step - 1));
  };

  const handleNext = () => {
    if (hasNext) {
      setStep(step + 1);
    }
  };

  return (
    <div className="space-y-10">
      <Alert message="You're currently exploring in guest mode. Sign in anytime to unlock all features and keep your progress saved!" />

      <div className="grid items-start gap-6 lg:grid-cols-[3fr_1.5fr] lg:gap-8">
        <StudyCard
          card={currentCard}
          step={step}
          totalCards={filteredCards.length}
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={step === 0}
          nextDisabled={!hasNext}
          filtersSlot={
            <GuestCategories
              categories={categories}
              onChange={(categories) => {
                setSelectedCategories(categories);
                setStep(0);
              }}
            />
          }
        />

        <Overview
          inProgressCount={0}
          masteredCount={0}
          notStartedCount={0}
          totalCards={guestCards.length}
        />
      </div>
    </div>
  );
};
