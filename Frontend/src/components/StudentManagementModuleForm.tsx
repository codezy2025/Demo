/**
 * 🏗️  DEVELOPMENT GUIDE - Student Management Module Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Student Management Module> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Student, Section, StudentStatus, ReportType } from '../types/StudentManagementModuleTypes';

interface StudentManagementModuleFormProps {
  onSubmit: SubmitHandler<StudentManagementModuleFormData>;
  initialData?: Student;
}

interface StudentManagementModuleFormData {
  student: Student;
  section?: Section;
  status?: StudentStatus;
  reportType?: ReportType;
  searchFilters?: {
    name?: string;
    status?: StudentStatus;
    section?: string;
  };
}

const StudentManagementModuleForm: React.FC<StudentManagementModuleFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<StudentManagementModuleFormData>({
    defaultValues: initialData ? { student: initialData } : {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Student Enrollment Fields */}
      <div>
        <h3>Student Information</h3>
        <input {...register('student.id', { required: true })} placeholder="Student ID" />
        {errors.student?.id && <span>This field is required</span>}

        <input {...register('student.name', { required: true })} placeholder="Full Name" />
        {errors.student?.name && <span>This field is required</span>}

        <input {...register('student.email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.student?.email && <span>Valid email is required</span>}
      </div>

      {/* Section Assignment Fields */}
      <div>
        <h3>Class Assignment</h3>
        <select {...register('section.id', { required: true })}>
          <option value="">Select Section</option>
          {/* Options would be populated from API */}
        </select>
        {errors.section?.id && <span>This field is required</span>}
      </div>

      {/* Status Management */}
      <div>
        <h3>Student Status</h3>
        <select {...register('status', { required: true })}>
          <option value="">Select Status</option>
          {Object.values(StudentStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {errors.status && <span>This field is required</span>}
      </div>

      {/* Search Filters */}
      <div>
        <h3>Search Filters</h3>
        <input {...register('searchFilters.name')} placeholder="Name" />
        <select {...register('searchFilters.status')}>
          <option value="">Any Status</option>
          {Object.values(StudentStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select {...register('searchFilters.section')}>
          <option value="">Any Section</option>
          {/* Options would be populated from API */}
        </select>
      </div>

      {/* Report Generation */}
      <div>
        <h3>Report Type</h3>
        <select {...register('reportType')}>
          <option value="">Select Report</option>
          {Object.values(ReportType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentManagementModuleForm;