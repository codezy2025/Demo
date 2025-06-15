/**
 * 🏗️  DEVELOPMENT GUIDE - Form Service
 * 
 * 📋 Original Requirements: Create ControlPanelForm.tsx with:
- Start/Hide button that triggers mouse movement
- Stop/Exit button for termination
- Status indicators for movement activity
- Settings display for interval configuration
- Proper TypeScript typing
- Clean UI matching the Java version's layout
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
 * - search(query: string): Promise<Form[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{FormStats}>
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
import { Form, FormCreateRequest, FormUpdateRequest } from '../types/FormTypes';

const API_BASE_URL = 'http://localhost:3000/api/forms';

export const formService = {
    getAll: async (): Promise<Form[]> => {
        const response = await axios.get<Form[]>(API_BASE_URL);
        return response.data;
    },
    create: async (formData: FormCreateRequest): Promise<Form> => {
        const response = await axios.post<Form>(API_BASE_URL, formData);
        return response.data;
    },
    update: async (id: string, formData: FormUpdateRequest): Promise<Form> => {
        const response = await axios.put<Form>(`${API_BASE_URL}/${id}`, formData);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};