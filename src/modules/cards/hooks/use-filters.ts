import { useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  type CardsFilters,
  cardsSearchParams,
} from "@/lib/validators/cards-search-params.schema";

const defaultFilters: CardsFilters = {
  categoryIds: [],
  hideMastered: false,
};

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersKey, setFiltersKey] = useState(0);

  const filters = useMemo(() => {
    return cardsSearchParams.parse(Object.fromEntries(searchParams));
  }, [searchParams]);

  const filtersApplied =
    filters.categoryIds.length > 0 ||
    filters.hideMastered !== defaultFilters.hideMastered;

  const updateFilters = useCallback(
    (newFilters: CardsFilters) => {
      const params = new URLSearchParams(searchParams);

      if (newFilters.hideMastered) {
        params.set("hideMastered", "true");
      } else {
        params.delete("hideMastered");
      }

      if (newFilters.categoryIds.length > 0) {
        params.set("categoryIds", newFilters.categoryIds.join(","));
      } else {
        params.delete("categoryIds");
      }

      window.history.pushState(null, "", `?${params.toString()}`);
    },
    [searchParams],
  );

  const resetFilters = useCallback(() => {
    window.history.pushState(null, "", pathname);
    setFiltersKey((filtersKey) => filtersKey + 1);
  }, [pathname]);

  return {
    filters,
    updateFilters,
    filtersApplied,
    resetFilters,
    filtersKey,
  };
};
