import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { cardsInfiniteQueryOptions } from "@/lib/queries/cards.query";
import { categoriesQueryOptions } from "@/lib/queries/categories.query";
import { cardsSearchParams } from "@/lib/validators/cards-search-params.schema";

import { CardForm } from "./components/card-form";
import { CardsList } from "./components/cards-list";
import { CardsLoading } from "./cards.loading";

interface CardsPageProps {
  searchParams: Promise<unknown>;
}

export const CardsPage = async ({ searchParams }: CardsPageProps) => {
  const params = cardsSearchParams.parse(await searchParams);
  const queryClient = new QueryClient();

  queryClient.prefetchInfiniteQuery(cardsInfiniteQueryOptions(params));
  queryClient.prefetchQuery(categoriesQueryOptions());

  return (
    <main className="p-4 pb-10 md:p-8 md:pb-16">
      <div className="mx-auto flex max-w-310 flex-col gap-10 md:gap-12">
        <CardForm />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<CardsLoading />}>
            <CardsList />
          </Suspense>
        </HydrationBoundary>
      </div>
    </main>
  );
};
