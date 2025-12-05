import { cn } from "@/utils/cn";

interface EmptyProps {
  title: React.ReactNode;
  description: React.ReactNode;
  muted?: boolean;
  children?: React.ReactNode;
}

export const Empty = ({ title, description, muted, children }: EmptyProps) => {
  return (
    <section className="flex min-h-62.5 flex-col items-center justify-center gap-2.5 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p
        className={cn("font-normal text-balance", muted && "text-neutral-600")}
      >
        {description}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
};
