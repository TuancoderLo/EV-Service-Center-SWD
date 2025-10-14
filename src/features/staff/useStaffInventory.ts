/**
 * Staff Inventory Hook
 * Handle inventory management for staff
 */

import { inventoryApi, InventoryItem } from "@/src/api/endpoints/inventory.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseStaffInventoryReturn {
  items: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchItems: (query: string) => Promise<void>;
  getItemById: (itemId: string) => Promise<InventoryItem | null>;
  updateItemQuantity: (
    itemId: string,
    quantity: number
  ) => Promise<InventoryItem>;
  getLowStockItems: () => InventoryItem[];
  isUpdating: boolean;
  clearError: () => void;
}

export const useStaffInventory = (): UseStaffInventoryReturn => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (query?: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await inventoryApi.getInventoryItems(query);
      setItems(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useStaffInventory.fetchItems");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const searchItems = async (query: string): Promise<void> => {
    await fetchItems(query);
  };

  const getItemById = async (itemId: string): Promise<InventoryItem | null> => {
    try {
      setError(null);

      // Check local state first
      const localItem = items.find((item) => item.id === itemId);
      if (localItem) {
        return localItem;
      }

      // Fetch from API if not found locally
      const item = await inventoryApi.getInventoryItemById(itemId);
      return item;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useStaffInventory.getItemById");
      setError(errorMessage);
      return null;
    }
  };

  const updateItemQuantity = async (
    itemId: string,
    quantity: number
  ): Promise<InventoryItem> => {
    try {
      setIsUpdating(true);
      setError(null);

      // Validate quantity
      if (quantity < 0) {
        throw new Error("Quantity cannot be negative");
      }

      const updateData = { quantity };
      const updatedItem = await inventoryApi.updateInventoryItem(
        itemId,
        updateData
      );

      // Update local state
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );

      return updatedItem;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useStaffInventory.updateItemQuantity");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const getLowStockItems = (): InventoryItem[] => {
    return items.filter((item) => {
      // Consider item low stock if quantity is less than or equal to 10
      const lowStockThreshold = 10;
      return item.quantity <= lowStockThreshold;
    });
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch items when component mounts
  useEffect(() => {
    fetchItems();
    // fetchItems is stable from API module
  }, []);

  return {
    items,
    isLoading,
    error,
    refetch: fetchItems,
    searchItems,
    getItemById,
    updateItemQuantity,
    getLowStockItems,
    isUpdating,
    clearError,
  };
};
