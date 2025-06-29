/**
 * 🏗️  DEVELOPMENT GUIDE - Billing Module Service
 * 
 * 📋 Original Requirements: Generate React TSX files for: 1) CartPage component with item management and tax calculation, 2) BillsPage component for displaying invoice history, 3) BillingService for API calls, and 4) TypeScript interfaces matching the Mongoose schema
 * 
 * 🚀 Enhancement Ideas:
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Billing Module[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Billing ModuleStats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { Billing, CreateBillingData, UpdateBillingData } from '../types/BillingModuleTypes';

const API_BASE_URL = 'http://localhost:3000/api/billing';

export const billingModuleService = {
    getAll: async (): Promise<Billing[]> => {
        const response = await axios.get<Billing[]>(API_BASE_URL);
        return response.data;
    },

    create: async (data: CreateBillingData): Promise<Billing> => {
        const response = await axios.post<Billing>(API_BASE_URL, data);
        return response.data;
    },

    update: async (id: string, data: UpdateBillingData): Promise<Billing> => {
        const response = await axios.put<Billing>(`${API_BASE_URL}/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};