"use client";

import {
  BookOpenIcon,
  BrainIcon,
  LayersIcon,
  LucideIcon,
  Package2Icon,
} from "lucide-react";

interface OverviewProps {
  totalCards: number;
  masteredCount: number;
  inProgressCount: number;
  notStartedCount: number;
}

export const Overview = ({
  totalCards,
  masteredCount,
  inProgressCount,
  notStartedCount,
}: OverviewProps) => {
  return (
    <aside className="shadow-border-md sticky top-4 flex flex-col gap-2 rounded-2xl border bg-neutral-50 px-4 py-5 lg:p-6">
      <h2 className="mb-2 text-2xl">Study Statistics</h2>

      <div className="flex flex-col gap-4 md:gap-5">
        <Card
          title="Total cards"
          value={totalCards}
          icon={LayersIcon}
          color="#92ADEB"
        />
        <Card
          title="Mastered"
          value={masteredCount}
          icon={BrainIcon}
          color="#47D9C9"
        />
        <Card
          title="In Progress"
          value={inProgressCount}
          icon={BookOpenIcon}
          color="#F073A3"
        />
        <Card
          title="Not Started"
          value={notStartedCount}
          icon={Package2Icon}
          color="#FC8AE5"
        />
      </div>
    </aside>
  );
};

interface CardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export const Card = ({ title, value, icon: Icon, color }: CardProps) => {
  return (
    <div className="shadow-border-sm flex overflow-hidden rounded-xl border">
      <div className="flex flex-1 flex-col gap-8 p-5 md:gap-4">
        <h3 className="leading-none">{title}</h3>
        <p className="text-2xl leading-tight font-bold md:text-[2rem] lg:text-[2.5rem]">
          {value}
        </p>
      </div>

      <div
        style={{ backgroundColor: color }}
        className="grid w-25 place-content-center border-l"
      >
        <Icon className="size-7" />
      </div>
    </div>
  );
};
