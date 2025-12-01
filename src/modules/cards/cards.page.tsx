import { CreateCardForm } from "./create-card-form";

export const CardsPage = () => {
  return (
    <main className="p-4 md:p-8">
      <div className="mx-auto flex max-w-310 flex-col gap-8">
        <CreateCardForm />
      </div>
    </main>
  );
};
