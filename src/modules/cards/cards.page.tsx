import { getCurrentUser } from "@/lib/session";

import { CardForm } from "./components/card-form";
import { CardsList } from "./components/cards-list";
import { Alert } from "@/components/ui/alert";

export const CardsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <main className="p-4 pb-10 md:p-8 md:pb-16">
      <div className="mx-auto flex max-w-310 flex-col gap-10 md:gap-12">
        {!currentUser ? (
          <Alert
            message="👋 Welcome! Sign in to unlock all the features and make the most of
          Flashcards."
          />
        ) : (
          <>
            <div className="shadow-border-lg rounded-2xl border bg-neutral-50 p-5 md:p-6 lg:p-8">
              <CardForm />
            </div>

            <CardsList />
          </>
        )}
      </div>
    </main>
  );
};
