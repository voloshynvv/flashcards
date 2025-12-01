interface EmptyProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export const Empty = ({ title, description }: EmptyProps) => {
  return (
    <section className="flex min-h-62.5 flex-col items-center justify-center gap-2.5 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="font-normal">{description}</p>
    </section>
  );
};
