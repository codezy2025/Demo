/**
 * 🏗️  DEVELOPMENT GUIDE - Module2 Service
 * 
 * 📋 Original Requirements: Create React TypeScript components for a frontend that would interface with the Module2 database backend described. This should include:
1. A DatabaseService module for handling all API calls (connection, queries, user tracking)
2. Type definitions for all data structures
3. A Login/Logout component for user tracking
4. A DataTable component for displaying recordsets
5. A ConnectionStatus component showing database connection state
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
 * - search(query: string): Promise<Module2[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Module2Stats}>
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
import { Module2Type, Module2CreateType, Module2UpdateType } from '../types/Module2Types';

const API_BASE_URL = 'http://localhost:3000/api/module2';

const getAll = async (): Promise<Module2Type[]> => {
    const response = await axios.get<Module2Type[]>(API_BASE_URL);
    return response.data;
};

const create = async (data: Module2CreateType): Promise<Module2Type> => {
    const response = await axios.post<Module2Type>(API_BASE_URL, data);
    return response.data;
};

const update = async (id: string, data: Module2UpdateType): Promise<Module2Type> => {
    const response = await axios.put<Module2Type>(`${API_BASE_URL}/${id}`, data);
    return response.data;
};

const deleteById = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const module2Service = {
    getAll,
    create,
    update,
    deleteById
};