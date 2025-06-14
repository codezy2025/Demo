/**
 * 🏗️  DEVELOPMENT GUIDE - Form1 Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Form1> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Form1Data } from '../types/Form1Types';

interface Form1FormProps {
  onSubmit: (data: Form1Data) => void;
}

const Form1Form: React.FC<Form1FormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Form1Data>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="studentNumber">Student Number</label>
        <input
          id="studentNumber"
          {...register('studentNumber', { required: 'Student Number is required' })}
        />
        {errors.studentNumber && <span>{errors.studentNumber.message}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          {...register('lastName', { required: 'Last Name is required' })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          {...register('firstName', { required: 'First Name is required' })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <label htmlFor="middleName">Middle Name</label>
        <input id="middleName" {...register('middleName')} />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender', { required: 'Gender is required' })}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register('status', { required: 'Status is required' })}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {errors.status && <span>{errors.status.message}</span>}
      </div>

      <div>
        <label htmlFor="schoolYear">School Year</label>
        <input
          id="schoolYear"
          {...register('schoolYear', { required: 'School Year is required' })}
        />
        {errors.schoolYear && <span>{errors.schoolYear.message}</span>}
      </div>

      <div>
        <label htmlFor="gradeLevel">Grade Level</label>
        <input
          id="gradeLevel"
          {...register('gradeLevel', { required: 'Grade Level is required' })}
        />
        {errors.gradeLevel && <span>{errors.gradeLevel.message}</span>}
      </div>

      <div>
        <label htmlFor="section">Section</label>
        <input id="section" {...register('section')} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form1Form;