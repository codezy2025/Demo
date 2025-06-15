/**
 * 🏗️  DEVELOPMENT GUIDE - List Service
 * 
 * 📋 Original Requirements: Create NotificationList.tsx with:
1. System notification display
2. Movement history tracking
3. Restore functionality
4. Clean UI matching the Java version's tray menu
5. TypeScript typing for all props
6. Responsive design for different notification types
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
 * - search(query: string): Promise<List[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ListStats}>
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
import { List, ListCreateRequest, ListUpdateRequest } from '../types/ListTypes';

const API_BASE_URL = 'http://localhost:3000/api/lists';

const getAll = async (): Promise<List[]> => {
    const response = await axios.get<List[]>(API_BASE_URL);
    return response.data;
};

const create = async (listData: ListCreateRequest): Promise<List> => {
    const response = await axios.post<List>(API_BASE_URL, listData);
    return response.data;
};

const update = async (id: string, listData: ListUpdateRequest): Promise<List> => {
    const response = await axios.put<List>(`${API_BASE_URL}/${id}`, listData);
    return response.data;
};

const deleteList = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const listService = {
    getAll,
    create,
    update,
    delete: deleteList,
};