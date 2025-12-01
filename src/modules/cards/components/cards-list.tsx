"use client";

import { ChevronDown, ShuffleIcon } from "lucide-react";

import { Empty } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { CardItem } from "./card-item";

import { cards } from "../mock.json";

export const CardsList = () => {
  if (cards.length === 0) {
    return (
      <Empty
        title="No cards yet"
        description="Add your first card using the form above and it will show up here."
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-5 md:mb-8">
        <div className="flex flex-wrap gap-5">
          <DropdownMenu
            align="start"
            trigger={
              <Button variant="secondary" noShadow>
                All Categories <ChevronDown />
              </Button>
            }
          >
            <DropdownMenuCheckboxItem>Art (1)</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>CSS (6)</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Geography (4)</DropdownMenuCheckboxItem>
          </DropdownMenu>

          <div className="inline-flex items-center gap-2">
            <Checkbox id="mastered" />
            <Label htmlFor="mastered">Hide Mastered</Label>
          </div>
        </div>

        <Button variant="secondary" noShadow>
          <ShuffleIcon />
          Shuffle
        </Button>
      </div>

      <div className="flex flex-col gap-10 md:gap-12">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>

        <Button className="mx-auto block" variant="secondary">
          Load More
        </Button>
      </div>
    </div>
  );
};
