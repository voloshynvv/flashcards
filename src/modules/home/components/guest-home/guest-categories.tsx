import { useState } from "react";
import { Category } from "@/lib/queries/categories.query";

import { CategoriesDropdown } from "@/components/shared/categories-dropdown";

interface GuestCategoriesProps {
  categories: Category[];
  onChange?: (selectedCategories: string[]) => void;
}

export const GuestCategories = ({
  categories,
  onChange,
}: GuestCategoriesProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const hanldeOpenChange = (open: boolean) => {
    if (!open) {
      onChange?.(selectedCategories);
    }
  };

  return (
    <CategoriesDropdown
      onOpenChange={hanldeOpenChange}
      categories={categories}
      selectedCategories={selectedCategories}
      onSelect={setSelectedCategories}
      lookUpBy="name"
    />
  );
};
