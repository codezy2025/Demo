/**
 * 🏗️  DEVELOPMENT GUIDE - Reporting Module (Module3) Form Component
 * 
 * 📋 Original Requirements: Create a React TSX implementation of the Reporting Module with the following components:
1. A ReportHeader component that displays school name, address, school year, and section name
2. Report forms for student records, class lists, population statistics, and login activity
3. Data sources integration with student management and user management modules
4. Standardized report templates with consistent header information
5. Error handling for database issues and empty data

The implementation should include:
- Types/interfaces for report data structures
- Components for each report type (Form17, Form20, Form21, Form25)
- Data fetching services
- Report display components
- Error handling components
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
 * - initialData?: Partial<Reporting Module (Module3)> (for edit mode)
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
import { ReportFormData } from '../types/Reporting Module (Module3)Types';

interface ReportingModuleFormProps {
  onSubmit: (data: ReportFormData) => void;
}

const ReportingModuleForm: React.FC<ReportingModuleFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="reporting-module-form">
      <div className="form-group">
        <label htmlFor="schoolName">School Name</label>
        <input
          id="schoolName"
          {...register('schoolName', { required: 'School name is required' })}
        />
        {errors.schoolName && <span className="error">{errors.schoolName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <span className="error">{errors.address.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="schoolYear">School Year</label>
        <input
          id="schoolYear"
          {...register('schoolYear', { required: 'School year is required' })}
        />
        {errors.schoolYear && <span className="error">{errors.schoolYear.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="sectionName">Section Name</label>
        <input
          id="sectionName"
          {...register('sectionName', { required: 'Section name is required' })}
        />
        {errors.sectionName && <span className="error">{errors.sectionName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="reportType">Report Type</label>
        <select
          id="reportType"
          {...register('reportType', { required: 'Report type is required' })}
        >
          <option value="">Select report type</option>
          <option value="Form17">Form 17 (Student Records)</option>
          <option value="Form20">Form 20 (Class Lists)</option>
          <option value="Form21">Form 21 (Population Statistics)</option>
          <option value="Form25">Form 25 (Login Activity)</option>
        </select>
        {errors.reportType && <span className="error">{errors.reportType.message}</span>}
      </div>

      <button type="submit" className="submit-button">
        Generate Report
      </button>
    </form>
  );
};

export default ReportingModuleForm;