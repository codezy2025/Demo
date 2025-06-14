/**
 * 🏗️  DEVELOPMENT GUIDE - Form10 Service
 * 
 * 📋 Original Requirements: Create a React TypeScript form for managing academic levels with the following features:
1. Add new levels and edit existing ones
2. Form with a text input for level name
3. Update and Cancel buttons
4. Proper validation for empty fields
5. Integration with a parent component (Form9)
6. Success/error messaging
7. Maintain form state for add/edit modes
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
 * - search(query: string): Promise<Form10[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form10Stats}>
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
import { Form10, Form10Create, Form10Update } from '../types/Form10Types';

const API_BASE_URL = 'http://localhost:3000/api/form10s';

const getAll = async (): Promise<Form10[]> => {
    const response = await axios.get<Form10[]>(API_BASE_URL);
    return response.data;
};

const create = async (form10Data: Form10Create): Promise<Form10> => {
    const response = await axios.post<Form10>(API_BASE_URL, form10Data);
    return response.data;
};

const update = async (id: string, form10Data: Form10Update): Promise<Form10> => {
    const response = await axios.put<Form10>(`${API_BASE_URL}/${id}`, form10Data);
    return response.data;
};

const deleteById = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const form10Service = {
    getAll,
    create,
    update,
    delete: deleteById
};