/**
 * 🏗️  DEVELOPMENT GUIDE - Form6 Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Form6> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

export interface Form6 {
  id: string;
  personalInformation: {
    name: string;
    gender: string;
    birthDate: Date;
    address: string;
  };
  familyBackground: {
    fatherName: string;
    fatherOccupation: string;
    fatherContact: string;
    motherName: string;
    motherOccupation: string;
    motherContact: string;
  };
  academicInformation: {
    status: 'New' | 'Old' | 'Drop';
    generalAverage: number;
    level: string;
    section: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Form6FormData {
  personalInformation: {
    name: string;
    gender: string;
    birthDate: string;
    address: string;
  };
  familyBackground: {
    fatherName: string;
    fatherOccupation: string;
    fatherContact: string;
    motherName: string;
    motherOccupation: string;
    motherContact: string;
  };
  academicInformation: {
    status: 'New' | 'Old' | 'Drop';
    generalAverage: string;
    level: string;
    section: string;
  };
}