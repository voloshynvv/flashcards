import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesQueryOptions } from "@/lib/queries/categories.query";
import { CardsFilters } from "@/lib/validators/cards-search-params.schema";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { CategoriesDropdown } from "./categories-dropdown";

interface FiltersProps {
  filters: CardsFilters;
  onChange: (newFilters: CardsFilters) => void;
  children?: React.ReactNode;
}

export const Filters = ({ filters, onChange, children }: FiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categoriesQuery = useSuspenseQuery(categoriesQueryOptions());

  return (
    <div className="flex flex-wrap items-center gap-5">
      <CategoriesDropdown
        categories={categoriesQuery.data}
        selectedCategories={selectedCategories}
        onChange={setSelectedCategories}
        onOpenChange={(open) => {
          if (!open) {
            onChange({
              ...filters,
              categoryIds: selectedCategories,
            });
          }
        }}
      />

      <div className="flex items-center gap-2">
        <Checkbox
          id="mastered"
          checked={filters.hideMastered}
          onCheckedChange={(checked) =>
            onChange({ ...filters, hideMastered: !!checked })
          }
        />
        <Label htmlFor="mastered">Hide Mastered</Label>
      </div>

      {children && <div className="ml-auto">{children}</div>}
    </div>
  );
};
