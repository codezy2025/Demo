/**
 * 🏗️  DEVELOPMENT GUIDE - Module1 Service
 * 
 * 📋 Original Requirements: Convert the VB6 Module1 utilities to React TypeScript components and hooks. Create separate files for form utilities, list utilities, validation utilities, and database utilities. Use modern React patterns like hooks and context for state management. Include TypeScript interfaces for all function parameters and return types.
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
 * - search(query: string): Promise<Module1[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Module1Stats}>
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
import { Module1Type, Module1CreateType, Module1UpdateType } from '../types/Module1Types';

const API_BASE_URL = 'http://localhost:3000/api/module1';

const module1Service = {
    getAll: async (): Promise<Module1Type[]> => {
        const response = await axios.get<Module1Type[]>(API_BASE_URL);
        return response.data;
    },

    create: async (data: Module1CreateType): Promise<Module1Type> => {
        const response = await axios.post<Module1Type>(API_BASE_URL, data);
        return response.data;
    },

    update: async (id: string, data: Module1UpdateType): Promise<Module1Type> => {
        const response = await axios.put<Module1Type>(`${API_BASE_URL}/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};

export default module1Service;