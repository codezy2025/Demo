/**
 * 🏗️  DEVELOPMENT GUIDE - Form4 Service
 * 
 * 📋 Original Requirements: Create a React TSX implementation of a section selection form with the following requirements:
1. Display section information for a selected academic level
2. Allow level selection through a modal dialog
3. Show section details including name, capacity, and requirements
4. Validate section capacity before selection
5. Integrate with parent component for enrollment
6. Include cancel functionality
7. Maintain state for selected level and section
8. Use TypeScript interfaces for data types
9. Implement proper error handling
10. Follow modern React best practices
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
 * - search(query: string): Promise<Form4[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form4Stats}>
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
import { Form4, Form4Create, Form4Update } from '../types/Form4Types';

const API_BASE_URL = '/api/form4';

const getAll = async (): Promise<Form4[]> => {
  const response = await axios.get<Form4[]>(API_BASE_URL);
  return response.data;
};

const create = async (form4Data: Form4Create): Promise<Form4> => {
  const response = await axios.post<Form4>(API_BASE_URL, form4Data);
  return response.data;
};

const update = async (id: string, form4Data: Form4Update): Promise<Form4> => {
  const response = await axios.put<Form4>(`${API_BASE_URL}/${id}`, form4Data);
  return response.data;
};

const deleteForm4 = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const form4Service = {
  getAll,
  create,
  update,
  delete: deleteForm4,
};