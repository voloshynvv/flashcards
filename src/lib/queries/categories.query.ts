import { queryOptions } from "@tanstack/react-query";

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const getCategories = async (name: string) => {
  const params = new URLSearchParams();
  if (name) {
    params.append("name", name);
  }

  const response = await fetch(`/api/categories?${params}`);

  if (!response.ok) {
    throw new Error("failed to get categories");
  }

  const data = (await response.json()) as { categories: Category[] };
  return data.categories;
};

export const categoriesQueryOptions = (name = "") =>
  queryOptions({
    queryKey: ["categories", { name }],
    queryFn: () => getCategories(name),
  });
