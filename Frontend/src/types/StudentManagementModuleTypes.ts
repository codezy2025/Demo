/**
 * 🏗️  DEVELOPMENT GUIDE - Student Management Module Types
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
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Student Management Module>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Student Management ModuleStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Student Management ModuleSearchParams = Pick<Student Management Module, 'name' | 'status'>
 * - export type Student Management ModuleUpdateData = Partial<Omit<Student Management Module, 'id' | 'createdAt'>>
 */

export interface StudentManagementModule {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: string;
  enrollmentDate: Date;
  status: 'New' | 'Old' | 'Drop';
  currentGrade: string;
  sectionId: string;
  sectionName: string;
  guardianName: string;
  guardianContact: string;
  notes: string;
}

export interface StudentManagementModuleFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: 'Male' | 'Female' | 'Other' | '';
  email: string;
  phone: string;
  address: string;
  enrollmentDate: Date | null;
  status: 'New' | 'Old' | 'Drop' | '';
  currentGrade: string;
  sectionId: string;
  guardianName: string;
  guardianContact: string;
  notes: string;
}