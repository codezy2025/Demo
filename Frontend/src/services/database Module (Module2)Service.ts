/**
 * 🏗️  DEVELOPMENT GUIDE - Database Module (Module2) Service
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the Database Module with the following components:
1. A DatabaseService for handling all database operations
2. Types/interfaces for all global variables and data structures
3. Context providers for global state management
4. Utility functions for database operations

Key requirements:
- Use TypeScript interfaces for type safety
- Implement connection management with proper error handling
- Create hooks for common operations
- Include session tracking functionality
- Maintain similar functionality to the original VB6 module
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
 * - search(query: string): Promise<Database Module (Module2)[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Database Module (Module2)Stats}>
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
import { 
    Module2Type, 
    CreateModule2Type, 
    UpdateModule2Type 
} from '../types/Database Module (Module2)Types';

const API_BASE_URL = 'http://localhost:3000/api/module2';

export const databaseModule2Service = {
    getAll: async (): Promise<Module2Type[]> => {
        const response = await axios.get<Module2Type[]>(API_BASE_URL);
        return response.data;
    },

    create: async (data: CreateModule2Type): Promise<Module2Type> => {
        const response = await axios.post<Module2Type>(API_BASE_URL, data);
        return response.data;
    },

    update: async (id: string, data: UpdateModule2Type): Promise<Module2Type> => {
        const response = await axios.put<Module2Type>(`${API_BASE_URL}/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};