/**
 * Inventory Management Hook for Admin
 * Handle inventory listing and management
 */

import {
  CreateInventoryItemRequest,
  inventoryApi,
  InventoryItem,
  UpdateInventoryItemRequest,
} from "@/src/api/endpoints/inventory.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseInventoryReturn {
  items: InventoryItem[];
  lowStockItems: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createItem: (data: CreateInventoryItemRequest) => Promise<InventoryItem>;
  updateItem: (
    itemId: string,
    data: UpdateInventoryItemRequest
  ) => Promise<InventoryItem>;
  deleteItem: (itemId: string) => Promise<void>;
  updateStock: (
    itemId: string,
    quantity: number,
    reason: string
  ) => Promise<InventoryItem>;
  fetchLowStock: () => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isUpdatingStock: boolean;
  clearError: () => void;
}

export const useInventory = (category?: string): UseInventoryReturn => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await inventoryApi.getInventoryItems(category);
      setItems(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useInventory.fetchItems");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLowStock = async (): Promise<void> => {
    try {
      setError(null);

      const data = await inventoryApi.getLowStockItems();
      setLowStockItems(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useInventory.fetchLowStock");
      setError(errorMessage);
    }
  };

  const createItem = async (
    data: CreateInventoryItemRequest
  ): Promise<InventoryItem> => {
    try {
      setIsCreating(true);
      setError(null);

      // Validate required fields
      if (!data.name || !data.sku || !data.category) {
        throw new Error("Please fill in all required fields");
      }

      if (data.quantity < 0 || data.minStock < 0 || data.maxStock < 0) {
        throw new Error("Quantities cannot be negative");
      }

      if (data.minStock >= data.maxStock) {
        throw new Error("Max stock must be greater than min stock");
      }

      const newItem = await inventoryApi.createInventoryItem(data);

      // Add to local state
      setItems((prev) => [...prev, newItem]);

      return newItem;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useInventory.createItem");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCreating(false);
    }
  };

  const updateItem = async (
    itemId: string,
    data: UpdateInventoryItemRequest
  ): Promise<InventoryItem> => {
    try {
      setIsUpdating(true);
      setError(null);

      const updatedItem = await inventoryApi.updateInventoryItem(itemId, data);

      // Update local state
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );

      return updatedItem;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useInventory.updateItem");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteItem = async (itemId: string): Promise<void> => {
    try {
      setIsDeleting(true);
      setError(null);

      await inventoryApi.deleteInventoryItem(itemId);

      // Remove from local state
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useInventory.deleteItem");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsDeleting(false);
    }
  };

  const updateStock = async (
    itemId: string,
    quantity: number,
    reason: string
  ): Promise<InventoryItem> => {
    try {
      setIsUpdatingStock(true);
      setError(null);

      if (!reason.trim()) {
        throw new Error("Please provide a reason for stock update");
      }

      const updatedItem = await inventoryApi.updateStock(
        itemId,
        quantity,
        reason
      );

      // Update local state
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );

      return updatedItem;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useInventory.updateStock");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdatingStock(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch items when component mounts or category changes
  useEffect(() => {
    fetchItems();
  }, [category]); // fetchItems is stable, no need to include

  return {
    items,
    lowStockItems,
    isLoading,
    error,
    refetch: fetchItems,
    createItem,
    updateItem,
    deleteItem,
    updateStock,
    fetchLowStock,
    isCreating,
    isUpdating,
    isDeleting,
    isUpdatingStock,
    clearError,
  };
};
