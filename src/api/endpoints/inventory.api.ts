/**
 * Inventory API endpoints
 * Handle inventory management for parts and supplies
 */

import { httpClient } from '../client';
import { USE_MOCK_DATA } from '../config';
import { normalizeHttpError } from '@/src/utils/http-error';

// Type definitions
export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  category: 'battery' | 'charger' | 'cable' | 'tool' | 'part' | 'fluid' | 'other';
  brand?: string;
  model?: string;
  sku: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  currency: 'USD' | 'VND';
  location?: string;
  supplier?: string;
  status: 'active' | 'inactive' | 'discontinued';
  lastRestocked?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryItemRequest {
  name: string;
  description?: string;
  category: InventoryItem['category'];
  brand?: string;
  model?: string;
  sku: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  currency: InventoryItem['currency'];
  location?: string;
  supplier?: string;
}

export interface UpdateInventoryItemRequest extends Partial<CreateInventoryItemRequest> {
  status?: InventoryItem['status'];
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  performedBy: string;
  createdAt: string;
}

// Mock data
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Tesla Model 3 Battery Pack',
    description: 'High voltage battery pack for Tesla Model 3',
    category: 'battery',
    brand: 'Tesla',
    model: 'Model 3',
    sku: 'TESLA-BAT-M3-001',
    quantity: 5,
    minStock: 2,
    maxStock: 10,
    unitPrice: 15000,
    currency: 'USD',
    location: 'Battery Storage A1',
    supplier: 'Tesla Parts',
    status: 'active',
    lastRestocked: '2025-10-01T10:00:00Z',
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2025-10-14T00:00:00Z',
  },
  {
    id: '2',
    name: 'Level 2 EV Charger',
    description: '240V Level 2 EV charging station',
    category: 'charger',
    brand: 'ChargePoint',
    model: 'Home Flex',
    sku: 'CP-HOMEFLEX-001',
    quantity: 12,
    minStock: 5,
    maxStock: 20,
    unitPrice: 650,
    currency: 'USD',
    location: 'Charger Storage B2',
    supplier: 'ChargePoint Supply Co',
    status: 'active',
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2025-10-14T00:00:00Z',
  },
];

const MOCK_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: '1',
    itemId: '1',
    type: 'out',
    quantity: -1,
    reason: 'Used for Tesla Model 3 battery replacement',
    performedBy: 'John Technician',
    createdAt: '2025-10-14T09:00:00Z',
  },
];

// API functions
export const inventoryApi = {
  /**
   * Get all inventory items
   */
  getInventoryItems: async (category?: string): Promise<InventoryItem[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (category) {
          return MOCK_INVENTORY.filter(item => item.category === category);
        }
        
        return MOCK_INVENTORY;
      }
      
      const response = await httpClient.get<InventoryItem[]>('/inventory', {
        params: { category },
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get inventory item by ID
   */
  getInventoryItemById: async (id: string): Promise<InventoryItem> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const item = MOCK_INVENTORY.find(i => i.id === id);
        if (!item) {
          throw new Error('Inventory item not found');
        }
        return item;
      }
      
      const response = await httpClient.get<InventoryItem>(`/inventory/${id}`);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Create inventory item
   */
  createInventoryItem: async (data: CreateInventoryItemRequest): Promise<InventoryItem> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const existingItem = MOCK_INVENTORY.find(item => item.sku === data.sku);
        if (existingItem) {
          throw new Error('SKU already exists');
        }
        
        const newItem: InventoryItem = {
          id: Date.now().toString(),
          ...data,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return newItem;
      }
      
      const response = await httpClient.post<InventoryItem>('/inventory', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Update inventory item
   */
  updateInventoryItem: async (id: string, data: UpdateInventoryItemRequest): Promise<InventoryItem> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const item = MOCK_INVENTORY.find(i => i.id === id);
        if (!item) {
          throw new Error('Inventory item not found');
        }
        
        return {
          ...item,
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
      
      const response = await httpClient.put<InventoryItem>(`/inventory/${id}`, data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Delete inventory item
   */
  deleteInventoryItem: async (id: string): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return;
      }
      
      await httpClient.delete(`/inventory/${id}`);
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Update stock quantity
   */
  updateStock: async (id: string, quantity: number, reason: string): Promise<InventoryItem> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 700));
        
        const item = MOCK_INVENTORY.find(i => i.id === id);
        if (!item) {
          throw new Error('Inventory item not found');
        }
        
        const newQuantity = Math.max(0, item.quantity + quantity);
        
        return {
          ...item,
          quantity: newQuantity,
          lastRestocked: quantity > 0 ? new Date().toISOString() : item.lastRestocked,
          updatedAt: new Date().toISOString(),
        };
      }
      
      const response = await httpClient.patch<InventoryItem>(`/inventory/${id}/stock`, {
        quantity,
        reason,
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get stock movements
   */
  getStockMovements: async (itemId?: string): Promise<StockMovement[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        if (itemId) {
          return MOCK_STOCK_MOVEMENTS.filter(movement => movement.itemId === itemId);
        }
        
        return MOCK_STOCK_MOVEMENTS;
      }
      
      const response = await httpClient.get<StockMovement[]>('/inventory/movements', {
        params: { itemId },
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get low stock items
   */
  getLowStockItems: async (): Promise<InventoryItem[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return MOCK_INVENTORY.filter(item => item.quantity <= item.minStock);
      }
      
      const response = await httpClient.get<InventoryItem[]>('/inventory/low-stock');
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },
};