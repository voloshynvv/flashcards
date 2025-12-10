import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoriesQueryOptions } from "@/lib/queries/categories.query";
import { CardsFilters } from "@/lib/validators/cards-search-params.schema";

import { Checkbox } from "@/components/ui/form/checkbox";
import { Label } from "@/components/ui/form/label";
import { CategoriesDropdown } from "./categories-dropdown";
import { Button } from "@/components/ui/button/button";

interface FiltersProps {
  filters: CardsFilters;
  onChange: (newFilters: CardsFilters) => void;
  shouldShowResetButton?: boolean;
  onReset?: () => void;
}

export const Filters = ({
  filters,
  onChange,
  shouldShowResetButton,
  onReset,
}: FiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.categoryIds,
  );

  const categoriesQuery = useQuery(categoriesQueryOptions());

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onChange({
        ...filters,
        categoryIds: selectedCategories,
      });
    }
  };

  const handleCheckedChange = (checked: boolean) => {
    onChange({ ...filters, hideMastered: checked });
  };

  return (
    <div className="flex flex-wrap items-center gap-5">
      <CategoriesDropdown
        categories={categoriesQuery.data ?? []}
        selectedCategories={selectedCategories}
        onSelect={setSelectedCategories}
        onOpenChange={handleOpenChange}
      />

      <div className="flex items-center gap-2">
        <Checkbox
          id="mastered"
          checked={filters.hideMastered}
          onCheckedChange={handleCheckedChange}
        />
        <Label htmlFor="mastered">Hide Mastered</Label>
      </div>

      {shouldShowResetButton && (
        <div className="ml-auto">
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};
