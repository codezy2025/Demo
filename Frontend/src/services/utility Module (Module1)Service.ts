/**
 * 🏗️  DEVELOPMENT GUIDE - Utility Module (Module1) Service
 * 
 * 📋 Original Requirements: Convert the VB6 utility module to React TypeScript with the following components:
1. Form positioning utilities (usePos, savePos)
2. Control visibility utilities (useControlVis, saveControlVis)
3. Database operations (deleteRec, getNextId, checkIfExists)
4. UI utilities (fillListView, searchListView, highlightFocus, showError, isEmpty)
5. Helper functions (createSettingsDir, centerForm)

All functions should be properly typed and use modern React hooks where applicable. Include proper error handling and TypeScript interfaces.
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
 * - search(query: string): Promise<Utility Module (Module1)[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Utility Module (Module1)Stats}>
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
import { Module1, Module1CreateRequest, Module1UpdateRequest } from '../types/Utility Module (Module1)Types';

const API_BASE_URL = 'http://localhost:3000/api/module1';

export const Module1Service = {
    getAll: async (): Promise<Module1[]> => {
        const response = await axios.get<Module1[]>(API_BASE_URL);
        return response.data;
    },

    create: async (request: Module1CreateRequest): Promise<Module1> => {
        const response = await axios.post<Module1>(API_BASE_URL, request);
        return response.data;
    },

    update: async (id: string, request: Module1UpdateRequest): Promise<Module1> => {
        const response = await axios.put<Module1>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};