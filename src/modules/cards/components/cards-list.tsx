"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { useFilters } from "../hooks/use-filters";
import { cn } from "@/utils/cn";
import { useDeleteCard } from "@/lib/mutations/delete-card.mutation";
import { createToast } from "@/components/ui/toast";

import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { CardItem } from "./card-item";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { UpdateCardDialog } from "./update-card-dialog";
import { Filters } from "@/components/filters";
import { Loader } from "@/components/ui/loader";

export const CardsList = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const { filters, updateFilters, resetFilters, filtersApplied } = useFilters();

  const deleteCard = useDeleteCard();

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

  const { data: cards } = cardsQuery;
  const selectedCard = cards.find((card) => card.id === selectedCardId);

  const handleCloseDialog = () => {
    setTimeout(() => {
      setActiveDialog(null);
      setSelectedCardId(null);
    }, 200);
  };

  const handleConfirmDelete = () => {
    if (!selectedCardId) {
      return;
    }

    deleteCard.mutate(selectedCardId, {
      onSuccess: () => {
        createToast("Card deleted.");
      },
      onError: () => {
        createToast("Something went wrong.");
      },
      onSettled: () => {
        handleCloseDialog();
      },
    });
  };

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
        <Filters
          key={filtersApplied ? "with-filters" : "without-filters"}
          filters={filters}
          onChange={updateFilters}
        >
          {filtersApplied && (
            <Button variant="secondary" onClick={resetFilters}>
              Reset
            </Button>
          )}
        </Filters>
      </div>

      {cards.length === 0 ? (
        <Empty
          title="No cards match your filters"
          description="Try adjusting your filters or adding more cards."
        />
      ) : (
        <div className={cn("flex flex-col gap-10 md:gap-12")}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onActionClick={(action) => {
                  setActiveDialog(action);
                  setSelectedCardId(card.id);
                }}
              />
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

      <AlertDialog
        open={activeDialog === "delete"}
        onOpenChange={handleCloseDialog}
        title="Delete this card?"
        description="This action can’t be undone."
        isPending={deleteCard.isPending}
        actionText="Delete Card"
        onConfirm={(e) => {
          e.preventDefault();
          handleConfirmDelete();
        }}
      />

      <UpdateCardDialog
        open={activeDialog === "update"}
        onOpenChange={handleCloseDialog}
        onSubmit={handleCloseDialog}
        card={selectedCard as Card}
      />
    </div>
  );
};
