/**
 * 🏗️  DEVELOPMENT GUIDE - Form12 Form Component
 * 
 * 📋 Original Requirements: Create a React TSX implementation of the School Year Management form with the following specifications:
1. Form with text input for school year (yyyy-yyyy format)
2. Update and Cancel buttons
3. Proper validation for format and duplicates
4. Add/edit mode functionality
5. Integration with parent component
6. All event handlers as described in documentation
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
 * - initialData?: Partial<Form12> (for edit mode)
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
import { Form12Data } from '../types/Form12Types';

interface Form12FormProps {
  onSubmit: (data: Form12Data) => void;
  onCancel: () => void;
  initialData?: Form12Data;
  isEditMode: boolean;
  existingYears: string[];
}

const Form12Form: React.FC<Form12FormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditMode,
  existingYears,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form12Data>({
    defaultValues: initialData || { schoolYear: '' },
  });

  const validateSchoolYearFormat = (value: string) => {
    const pattern = /^\d{4}-\d{4}$/;
    if (!pattern.test(value)) {
      return 'School year must be in yyyy-yyyy format';
    }
    
    const [startYear, endYear] = value.split('-').map(Number);
    if (endYear !== startYear + 1) {
      return 'End year must be exactly 1 year after start year';
    }

    if (isEditMode && initialData?.schoolYear === value) {
      return true;
    }

    if (existingYears.includes(value)) {
      return 'This school year already exists';
    }

    return true;
  };

  const handleFormSubmit = (data: Form12Data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="schoolYear">School Year (yyyy-yyyy)</label>
        <input
          id="schoolYear"
          {...register('schoolYear', {
            required: 'School year is required',
            validate: validateSchoolYearFormat,
          })}
        />
        {errors.schoolYear && <span>{errors.schoolYear.message}</span>}
      </div>

      <div>
        <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form12Form;