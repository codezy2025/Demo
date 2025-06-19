/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Service
 * 
 * 📋 Original Requirements: Create React TSX components for a numeric validator module that mirrors the Python validator.py functionality. Include:
1. A form component with input field and validation display
2. Types for the validator
3. A service that implements the validation logic
4. A page component that brings it all together

The validation should:
- Check if input can be converted to a number
- Return true/false result
- Handle all edge cases mentioned in the docs
- Display appropriate validation messages
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
 * - search(query: string): Promise<Validator[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ValidatorStats}>
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
import { Validator, ValidatorCreate, ValidatorUpdate } from '../types/ValidatorTypes';

const API_BASE_URL = '/api/validators';

const getAll = async (): Promise<Validator[]> => {
  const response = await axios.get<Validator[]>(API_BASE_URL);
  return response.data;
};

const create = async (validator: ValidatorCreate): Promise<Validator> => {
  const response = await axios.post<Validator>(API_BASE_URL, validator);
  return response.data;
};

const update = async (id: string, validator: ValidatorUpdate): Promise<Validator> => {
  const response = await axios.put<Validator>(`${API_BASE_URL}/${id}`, validator);
  return response.data;
};

const deleteValidator = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const validatorService = {
  getAll,
  create,
  update,
  delete: deleteValidator
};