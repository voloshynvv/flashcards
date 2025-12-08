import { queryOptions } from "@tanstack/react-query";

export interface Category {
  id: string;
  count: number;
  name: string;
}

interface GetCategoriesResponse {
  categories: Category[];
}

export const getCategories = async () => {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("failed to get categories");
  }

  const data = (await response.json()) as GetCategoriesResponse;
  return data.categories;
};

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
