import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type CardsFilters,
  cardsSearchParams,
} from "@/lib/validators/cards-search-params.schema";

const defaultFilters: CardsFilters = {
  categoryIds: [],
  hideMastered: false,
};

export const useFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters,
    updateFilters,
    filtersApplied,
    resetFilters,
  };
};
