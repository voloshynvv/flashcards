import { ChevronDownIcon } from "lucide-react";
import { Category } from "@/lib/queries/categories.query";

import { DropdownMenu, DropdownMenuCheckboxItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface CategoriesDropdownProps {
  categories: Category[];
  selectedCategories: string[];
  onChange: (value: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  lookUpBy?: "id" | "name";
}

export const CategoriesDropdown = ({
  categories,
  selectedCategories,
  onChange,
  onOpenChange,
  lookUpBy = "id",
}: CategoriesDropdownProps) => {
  const handleCheckedChange = (value: string) => {
    if (selectedCategories.includes(value)) {
      onChange(selectedCategories.filter((id) => id !== value));
    } else {
      onChange([...selectedCategories, value]);
    }
  };

  return (
    <div className="relative w-fit">
      <DropdownMenu
        onOpenChange={onOpenChange}
        align="start"
        trigger={
          <Button
            variant="secondary"
            disabled={categories.length === 0}
            noShadow
          >
            All Categories <ChevronDownIcon />
          </Button>
        }
      >
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            checked={selectedCategories.includes(category[lookUpBy])}
            onCheckedChange={() => {
              handleCheckedChange(category[lookUpBy]);
            }}
            key={category.id}
          >
            {category.name} ({category.count})
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenu>

      {selectedCategories.length > 0 && (
        <span className="absolute top-0 right-0 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-500 text-xs">
          {selectedCategories.length}
        </span>
      )}
    </div>
  );
};
