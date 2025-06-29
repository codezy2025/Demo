/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfiguration Service
 * 
 * 📋 Original Requirements: Create a React/TypeScript project configuration module that replicates the key functionality of a VB6 .vbp file in a modern web interface. Include:
1. A form to edit project settings (name, version, optimization flags)
2. A reference manager for dependencies (like stdole2.tlb)
3. Startup object selection (like Form1.frm)
4. Build configuration options
5. Visual representation of dependencies
6. Save/load functionality for configurations
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
 * - search(query: string): Promise<ProjectConfiguration[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ProjectConfigurationStats}>
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
import { ProjectConfiguration, ProjectConfigurationCreate, ProjectConfigurationUpdate } from '../types/ProjectConfigurationTypes';

const API_BASE_URL = '/api/project-configurations';

const getAll = async (): Promise<ProjectConfiguration[]> => {
  const response = await axios.get<ProjectConfiguration[]>(API_BASE_URL);
  return response.data;
};

const create = async (data: ProjectConfigurationCreate): Promise<ProjectConfiguration> => {
  const response = await axios.post<ProjectConfiguration>(API_BASE_URL, data);
  return response.data;
};

const update = async (id: string, data: ProjectConfigurationUpdate): Promise<ProjectConfiguration> => {
  const response = await axios.patch<ProjectConfiguration>(`${API_BASE_URL}/${id}`, data);
  return response.data;
};

const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const projectConfigurationService = {
  getAll,
  create,
  update,
  delete: deleteById
};