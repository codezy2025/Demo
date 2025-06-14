/**
 * 🏗️  DEVELOPMENT GUIDE - Module2Service Service
 * 
 * 📋 Original Requirements: Create a TypeScript service module that provides frontend equivalents to the Module2 database functionality. This should be an API service layer that would communicate with a backend that handles the actual database operations.

Key Features to Implement:
1. Database connection management (abstracted as API configuration)
2. Recordset operations (as API calls returning data)
3. User activity tracking (login/logout API calls)
4. Global state management (using React context instead of global variables)

Include proper TypeScript interfaces for all data types and API responses.
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
 * - search(query: string): Promise<Module2Service[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Module2ServiceStats}>
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
  Module2Item, 
  CreateModule2ItemDto, 
  UpdateModule2ItemDto 
} from '../types/Module2ServiceTypes';

const API_BASE_URL = 'http://localhost:3000/api/module2';

const getAll = async (): Promise<Module2Item[]> => {
  const response = await axios.get<Module2Item[]>(API_BASE_URL);
  return response.data;
};

const create = async (createDto: CreateModule2ItemDto): Promise<Module2Item> => {
  const response = await axios.post<Module2Item>(API_BASE_URL, createDto);
  return response.data;
};

const update = async (id: string, updateDto: UpdateModule2ItemDto): Promise<Module2Item> => {
  const response = await axios.patch<Module2Item>(`${API_BASE_URL}/${id}`, updateDto);
  return response.data;
};

const deleteItem = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const module2ServiceService = {
  getAll,
  create,
  update,
  delete: deleteItem
};