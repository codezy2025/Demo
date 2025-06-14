/**
 * 🏗️  DEVELOPMENT GUIDE - Form6 Service
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the Student Enrollment Form with the following requirements:

1. Form Sections:
   - Personal Information (name, gender, birth date, address)
   - Family Background (parents' names, occupations, contact)
   - Academic Information (status, general average, level/section)

2. Features:
   - Auto-calculated age from birth date
   - Form validation for required fields
   - Integration with backend services for saving data
   - Section assignment functionality

3. Data Types:
   - Student interface matching the database schema
   - Form state management

4. Components:
   - Main form with tabbed sections
   - Input components with validation
   - Action buttons (Save, Cancel, Clear)
   - Section selection modal

5. Business Rules:
   - Required field validation
   - Age calculation
   - Status handling (New/Old/Drop)
   - Section assignment validation
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
 * - search(query: string): Promise<Form6[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form6Stats}>
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
import { Form6, Form6Create, Form6Update } from '../types/Form6Types';

const API_BASE_URL = '/api/form6';

const getAll = async (): Promise<Form6[]> => {
    const response = await axios.get<Form6[]>(API_BASE_URL);
    return response.data;
};

const create = async (form6Data: Form6Create): Promise<Form6> => {
    const response = await axios.post<Form6>(API_BASE_URL, form6Data);
    return response.data;
};

const update = async (id: string, form6Data: Form6Update): Promise<Form6> => {
    const response = await axios.put<Form6>(`${API_BASE_URL}/${id}`, form6Data);
    return response.data;
};

const deleteById = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const form6Service = {
    getAll,
    create,
    update,
    delete: deleteById
};