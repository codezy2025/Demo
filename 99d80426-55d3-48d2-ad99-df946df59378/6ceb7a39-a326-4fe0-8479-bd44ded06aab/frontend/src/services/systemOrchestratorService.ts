/**
 * 🏗️  DEVELOPMENT GUIDE - SystemOrchestrator Service
 * 
 * 📋 Original Requirements: Generate React TSX files for a frontend interface to the SystemOrchestrator module. The interface should include:
1. QueryForm.tsx - A form for entering natural language queries with session management
2. ResultsDisplay.tsx - A component to display SQL results in table format with explanation
3. StatusPanel.tsx - For showing execution status, errors, and performance metrics
4. ConfigEditor.tsx - A configuration interface matching the YAML structure
5. types.ts - TypeScript interfaces matching QueryRequest and QueryResponse from the backend

Key requirements:
- Use Material-UI components
- Support dark/light theme
- Type-safe props for all components
- Error boundaries around query execution
- Responsive layout for analytics dashboard use
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
 * - search(query: string): Promise<SystemOrchestrator[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{SystemOrchestratorStats}>
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
import { SystemOrchestrator, SystemOrchestratorCreateRequest, SystemOrchestratorUpdateRequest } from '../types/SystemOrchestratorTypes';

const API_BASE_URL = '/api/system-orchestrators';

const getAll = async (): Promise<SystemOrchestrator[]> => {
  const response = await axios.get<SystemOrchestrator[]>(API_BASE_URL);
  return response.data;
};

const create = async (request: SystemOrchestratorCreateRequest): Promise<SystemOrchestrator> => {
  const response = await axios.post<SystemOrchestrator>(API_BASE_URL, request);
  return response.data;
};

const update = async (id: string, request: SystemOrchestratorUpdateRequest): Promise<SystemOrchestrator> => {
  const response = await axios.put<SystemOrchestrator>(`${API_BASE_URL}/${id}`, request);
  return response.data;
};

const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const systemOrchestratorService = {
  getAll,
  create,
  update,
  delete: deleteById,
};