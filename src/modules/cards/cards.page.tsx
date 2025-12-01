import { CardsList } from "./components/cards-list";
import { CreateCardForm } from "./components/create-card-form";

export const CardsPage = () => {
  return (
    <main className="p-4 pb-10 md:p-8 md:pb-16">
      <div className="mx-auto flex max-w-310 flex-col gap-10 md:gap-12">
        <CreateCardForm />
        <CardsList />
      </div>
    </main>
  );
};
