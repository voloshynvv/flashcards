import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { categoriesQueryOptions } from "@/lib/queries/categories.query";
import { CardsFilters } from "@/lib/validators/cards-search-params.schema";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CardsListFiltersProps {
  filters: CardsFilters;
  onChange: (newFilters: CardsFilters) => void;
}

export const CardsListFilters = ({
  filters,
  onChange,
}: CardsListFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(filters.categoryIds),
  );

  console.log(filters.categoryIds);

  const categoriesQuery = useSuspenseQuery(categoriesQueryOptions());

  const handleChangeCategory = (categoryId: string) => {
    const newCategories = new Set(selectedCategories);

    if (newCategories.has(categoryId)) {
      newCategories.delete(categoryId);
    } else {
      newCategories.add(categoryId);
    }

    setSelectedCategories(newCategories);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onChange({
        ...filters,
        categoryIds: [...selectedCategories],
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-5">
      <DropdownMenu
        onOpenChange={handleOpenChange}
        align="start"
        trigger={
          <Button variant="secondary" noShadow>
            All Categories <ChevronDownIcon />
          </Button>
        }
      >
        {categoriesQuery.data.map((category) => (
          <DropdownMenuCheckboxItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            checked={selectedCategories.has(category.id)}
            onCheckedChange={() => handleChangeCategory(category.id)}
            key={category.id}
          >
            {category.name} ({category.count})
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenu>

      <div className="inline-flex items-center gap-2">
        <Checkbox
          id="mastered"
          checked={filters.hideMastered}
          onCheckedChange={(checked) =>
            onChange({
              ...filters,
              hideMastered: checked as boolean,
            })
          }
        />
        <Label htmlFor="mastered">Hide Mastered</Label>
      </div>
    </div>
  );
};
