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

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form12SchoolYear } from '../types/Form12Types';

interface SchoolYearFormProps {
  initialData?: Form12SchoolYear;
  onSubmit: (data: Form12SchoolYear) => void;
  onCancel: () => void;
  existingYears: string[];
  isEditMode: boolean;
}

const schema = yup.object().shape({
  schoolYear: yup
    .string()
    .required('School year is required')
    .matches(/^\d{4}-\d{4}$/, 'Must be in yyyy-yyyy format')
    .test('unique', 'School year already exists', function (value) {
      const { existingYears, isEditMode, initialData } = this.parent;
      if (isEditMode && initialData?.schoolYear === value) return true;
      return !existingYears.includes(value);
    }),
});

const SchoolYearForm: React.FC<SchoolYearFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  existingYears,
  isEditMode,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form12SchoolYear>({
    resolver: yupResolver(schema),
    defaultValues: initialData || { schoolYear: '' },
    context: { existingYears, isEditMode, initialData },
  });

  useEffect(() => {
    reset(initialData || { schoolYear: '' });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="schoolYear" className="block text-sm font-medium text-gray-700">
          School Year (yyyy-yyyy)
        </label>
        <input
          id="schoolYear"
          type="text"
          {...register('schoolYear')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.schoolYear && (
          <p className="mt-2 text-sm text-red-600">{errors.schoolYear.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isEditMode ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default SchoolYearForm;