import { CheckCircleIcon, RotateCcwIcon } from "lucide-react";

import { Card } from "@/lib/queries/cards.query";
import { useLearnCard } from "@/lib/mutations/learn-card.mutation";
import { useResetProgress } from "@/lib/mutations/reset-progress.mutation";
import { createToast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";

interface CardActionsProps {
  card: Card;
}

export const CardActions = ({ card }: CardActionsProps) => {
  const learnCard = useLearnCard();
  const resetProgress = useResetProgress();

  const mastered = card.knownCount === 5;

  const handleLearnCard = () => {
    learnCard.mutate(card.id, {
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
    if (card.knownCount === 0) {
      createToast(
        "💡 You haven’t started learning this card yet. Let’s give it a go!",
      );
      return;
    }

    resetProgress.mutate(card.id, {
      onSuccess: () => {
        createToast(
          "🔄 All set! Progress has been reset. Ready to start fresh?",
        );
      },
      onError: () => {
        createToast(
          "😕 Oops! Couldn’t reset the progress. Try again in a moment.",
        );
      },
    });
  };

  return (
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
  );
};
