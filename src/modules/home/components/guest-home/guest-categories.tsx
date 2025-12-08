import { useState } from "react";
import { Category } from "@/lib/queries/categories.query";

import { CategoriesDropdown } from "@/components/categories-dropdown";

interface GuestCategoriesProps {
  categories: Category[];
  onSelect?: (selectedCategories: string[]) => void;
}

export const GuestCategories = ({
  categories,
  onSelect,
}: GuestCategoriesProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <CategoriesDropdown
      onOpenChange={(open) => {
        if (!open) {
          onSelect?.(selectedCategories);
        }
      }}
      categories={categories}
      selectedCategories={selectedCategories}
      onChange={setSelectedCategories}
      lookUpBy="name"
    />
  );
};
