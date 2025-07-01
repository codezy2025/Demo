/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfigurationEditor Service
 * 
 * 📋 Original Requirements: Create a React TSX project configuration editor UI that allows users to view and edit settings similar to a VB6 .vbp file. Include: 1) A form with fields for Type (Exe), Startup Form, References, Version Info (Major/Minor/Revision), and Optimization flags. 2) A read-only display of the generated .vbp file content. 3) Buttons to save/load configurations.
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
 * - search(query: string): Promise<ProjectConfigurationEditor[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ProjectConfigurationEditorStats}>
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
import { ProjectConfiguration, ProjectConfigurationCreateRequest, ProjectConfigurationUpdateRequest } from '../types/ProjectConfigurationEditorTypes';

const API_BASE_URL = '/api/project-configurations';

export const projectConfigurationEditorService = {
    getAll: async (): Promise<ProjectConfiguration[]> => {
        const response = await axios.get<ProjectConfiguration[]>(API_BASE_URL);
        return response.data;
    },
    create: async (request: ProjectConfigurationCreateRequest): Promise<ProjectConfiguration> => {
        const response = await axios.post<ProjectConfiguration>(API_BASE_URL, request);
        return response.data;
    },
    update: async (id: string, request: ProjectConfigurationUpdateRequest): Promise<ProjectConfiguration> => {
        const response = await axios.put<ProjectConfiguration>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};