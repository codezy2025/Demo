/**
 * 🏗️  DEVELOPMENT GUIDE - Form12 Service
 * 
 * 📋 Original Requirements: Create a React TSX implementation of the School Year Management form with the following specifications:
1. Form with text input for school year (yyyy-yyyy format)
2. Update and Cancel buttons
3. Proper validation for format and duplicates
4. Add/edit mode functionality
5. Integration with parent component
6. All event handlers as described in documentation
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
 * - search(query: string): Promise<Form12[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form12Stats}>
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
import { Form12, Form12Create, Form12Update } from '../types/Form12Types';

const API_BASE_URL = 'http://localhost:3000/api/form12';

const getAll = async (): Promise<Form12[]> => {
  const response = await axios.get<Form12[]>(API_BASE_URL);
  return response.data;
};

const create = async (form12Data: Form12Create): Promise<Form12> => {
  const response = await axios.post<Form12>(API_BASE_URL, form12Data);
  return response.data;
};

const update = async (id: string, form12Data: Form12Update): Promise<Form12> => {
  const response = await axios.put<Form12>(`${API_BASE_URL}/${id}`, form12Data);
  return response.data;
};

const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const form12Service = {
  getAll,
  create,
  update,
  delete: deleteById,
};