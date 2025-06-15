/**
 * 🏗️  DEVELOPMENT GUIDE - Page Service
 * 
 * 📋 Original Requirements: Create AutoMouseMoverPage.tsx with:
- Dimensions: 450x300px
- Start/Hide button that begins mouse movement and minimizes UI
- Stop/Exit button that terminates the app
- State management for xInProgress/yInProgress
- Pointer Lock API for mouse movement
- Browser notifications for system tray simulation
- Web Worker for background processing
- Clean TypeScript typing
- Error handling for permissions
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
 * - search(query: string): Promise<Page[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{PageStats}>
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
import { Page, PageCreate, PageUpdate } from '../types/PageTypes';

const API_BASE_URL = '/api/pages';

const getAll = async (): Promise<Page[]> => {
    const response = await axios.get<Page[]>(API_BASE_URL);
    return response.data;
};

const create = async (pageData: PageCreate): Promise<Page> => {
    const response = await axios.post<Page>(API_BASE_URL, pageData);
    return response.data;
};

const update = async (id: string, pageData: PageUpdate): Promise<Page> => {
    const response = await axios.put<Page>(`${API_BASE_URL}/${id}`, pageData);
    return response.data;
};

const deletePage = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const pageService = {
    getAll,
    create,
    update,
    delete: deletePage
};