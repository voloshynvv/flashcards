"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Card } from "@/lib/queries/cards.query";

import { Star } from "./star";
import { CardProgress } from "@/components/card-progress";
import { Tag } from "@/components/ui/tag";

interface StudyCardItemProps {
  card: Card;
}

export const StudyCardItem = ({ card }: StudyCardItemProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <button
      className="relative h-90 w-full cursor-pointer perspective-[1000px]"
      onClick={handleFlip}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]",
        )}
      >
        <CardShell card={card} className="bg-pink-400">
          <p className="text-2xl font-bold text-balance md:text-[2rem] lg:text-[2.5rem]">
            {card.question}
          </p>
          <p className="opacity-80">Click to reveal answer</p>
        </CardShell>

        <CardShell
          isFlipped
          card={card}
          className="[transform:rotateY(180deg)] bg-blue-400"
        >
          <p className="opacity-80">Answer:</p>
          <p className="text-2xl font-semibold text-balance">{card.answer}</p>
        </CardShell>
      </div>
    </button>
  );
};

interface CardShellProps extends React.ComponentProps<"div"> {
  card: Card;
  isFlipped?: boolean;
  children: React.ReactNode;
}

export const CardShell = ({
  card,
  className,
  isFlipped,
  children,
}: CardShellProps) => {
  return (
    <div
      className={cn(
        "shadow-border-sm absolute inset-0 flex flex-col items-center gap-4 rounded-2xl border px-4 py-5 text-center backface-hidden md:p-6",
        className,
      )}
    >
      <Tag className="inline-block max-w-[60%] truncate">{card.category}</Tag>

      <div className="flex h-full w-full flex-col items-center justify-center space-y-3">
        {children}
      </div>

      <div className="grid min-h-8 place-content-center">
        <CardProgress value={card.knownCount} />
      </div>

      <Star
        className={cn("absolute bottom-10 left-6 -rotate-25 text-yellow-500")}
      />
      <Star
        className={cn(
          "absolute top-10 right-7.5",
          isFlipped ? "text-pink-400" : "text-blue-400",
        )}
      />
    </div>
  );
};
