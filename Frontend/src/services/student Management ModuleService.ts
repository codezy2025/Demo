/**
 * 🏗️  DEVELOPMENT GUIDE - Student Management Module Service
 * 
 * 📋 Original Requirements: Generate React TSX files for the following components:
1. StudentEnrollmentForm (Form6) - Handles new student registration and existing student updates
2. StudentRecordView (Form1) - Displays detailed student information in a tabbed interface
3. SectionAssignment (Form3/Form4) - Manages student class assignments with validation
4. StudentSearch (Form7) - Advanced search functionality with multiple filters
5. StudentStatusManagement - Handles status changes (New/Old/Drop)
6. ReportGenerator - Handles various report generation

Include proper TypeScript interfaces for all data structures and form validation logic.
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
 * - search(query: string): Promise<Student Management Module[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Student Management ModuleStats}>
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
import { Student, CreateStudentDto, UpdateStudentDto } from '../types/StudentManagementModuleTypes';

const API_BASE_URL = 'http://localhost:3000/api/students';

export const studentManagementModuleService = {
  getAll: async (): Promise<Student[]> => {
    const response = await axios.get<Student[]>(API_BASE_URL);
    return response.data;
  },

  create: async (studentData: CreateStudentDto): Promise<Student> => {
    const response = await axios.post<Student>(API_BASE_URL, studentData);
    return response.data;
  },

  update: async (id: string, studentData: UpdateStudentDto): Promise<Student> => {
    const response = await axios.put<Student>(`${API_BASE_URL}/${id}`, studentData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};