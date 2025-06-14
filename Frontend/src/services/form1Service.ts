/**
 * 🏗️  DEVELOPMENT GUIDE - Form1 Service
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the student management form with the following features:
1. A data table displaying student records with columns: Student Number, Last Name, First Name, Middle Name, Gender, Status, School Year, Level/Grade, Section
2. Action buttons for: Add Student, Edit Student, Delete Student, Assign Section, Print Student List, Print Registration Slip, Advanced Search, Filter Options, Reload Data
3. Status bar showing record count
4. Integration with other forms (modal dialogs) for add/edit, section assignment, search and filtering
5. All the database operations described in the documentation
6. Proper TypeScript interfaces for student data
7. React hooks for state management
8. Error handling and user confirmation dialogs
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
 * - search(query: string): Promise<Form1[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form1Stats}>
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
import { Form1, Form1CreateRequest, Form1UpdateRequest } from '../types/Form1Types';

const API_BASE_URL = 'http://localhost:3000/api/form1';

export const form1Service = {
    getAll: async (): Promise<Form1[]> => {
        const response = await axios.get<Form1[]>(API_BASE_URL);
        return response.data;
    },
    create: async (formData: Form1CreateRequest): Promise<Form1> => {
        const response = await axios.post<Form1>(API_BASE_URL, formData);
        return response.data;
    },
    update: async (id: string, formData: Form1UpdateRequest): Promise<Form1> => {
        const response = await axios.put<Form1>(`${API_BASE_URL}/${id}`, formData);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};