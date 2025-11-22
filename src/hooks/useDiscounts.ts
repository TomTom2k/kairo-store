import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Discount } from "@/app/api/discounts/route";

export const discountKeys = {
  all: ["discounts"] as const,
  detail: (id: number) => ["discounts", id] as const,
};

/**
 * Fetch all discounts
 */
export function useDiscounts() {
  return useQuery({
    queryKey: discountKeys.all,
    queryFn: async () => {
      const response = await fetch("/api/discounts");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data as Discount[];
    },
  });
}

/**
 * Create a new discount
 */
export function useCreateDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (discountData: Partial<Discount>) => {
      const response = await fetch("/api/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discountData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountKeys.all });
    },
  });
}

/**
 * Update a discount
 */
export function useUpdateDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Discount>;
    }) => {
      const response = await fetch(`/api/discounts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountKeys.all });
    },
  });
}

/**
 * Delete a discount
 */
export function useDeleteDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/discounts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountKeys.all });
    },
  });
}

/**
 * Validate a discount code
 */
export function useValidateDiscount() {
  return useMutation({
    mutationFn: async ({
      code,
      orderTotal,
    }: {
      code: string;
      orderTotal: number;
    }) => {
      const response = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, orderTotal }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });
}
