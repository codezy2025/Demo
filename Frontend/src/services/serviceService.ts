/**
 * 🏗️  DEVELOPMENT GUIDE - Service Service
 * 
 * 📋 Original Requirements: Create mouseMovementService.ts with:
1. Pointer Lock API implementation
2. Random coordinate generation
3. Movement interval control (default 5s)
4. Web Worker communication
5. Proper error handling for permissions
6. TypeScript interfaces for all methods
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
 * - search(query: string): Promise<Service[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ServiceStats}>
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
import { Service, ServiceCreateRequest, ServiceUpdateRequest } from '../types/ServiceTypes';

const API_BASE_URL = 'http://localhost:3000/api/services';

export const serviceService = {
    getAll: async (): Promise<Service[]> => {
        const response = await axios.get<Service[]>(API_BASE_URL);
        return response.data;
    },
    create: async (serviceData: ServiceCreateRequest): Promise<Service> => {
        const response = await axios.post<Service>(API_BASE_URL, serviceData);
        return response.data;
    },
    update: async (id: string, serviceData: ServiceUpdateRequest): Promise<Service> => {
        const response = await axios.put<Service>(`${API_BASE_URL}/${id}`, serviceData);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};