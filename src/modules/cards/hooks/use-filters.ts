import { useMemo } from "react";
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

  const updateFilters = (newFilters: CardsFilters) => {
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

    replaceUrl(`${pathname}?${params.toString()}`);
  };

  const replaceUrl = (url: string) => {
    router.replace(url, { scroll: false });
  };

  const resetFilters = () => {
    replaceUrl(pathname);
  };

  return {
    filters,
    updateFilters,
    filtersApplied,
    resetFilters,
  };
};
