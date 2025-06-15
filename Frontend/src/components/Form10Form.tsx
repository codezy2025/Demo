/**
 * 🏗️  DEVELOPMENT GUIDE - Form10 Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript form for managing academic levels with the following features:
1. Add new levels and edit existing ones
2. Form with a text input for level name
3. Update and Cancel buttons
4. Proper validation for empty fields
5. Integration with a parent component (Form9)
6. Success/error messaging
7. Maintain form state for add/edit modes
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
 * - initialData?: Partial<Form10> (for edit mode)
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
import { Form10Data } from '../types/Form10Types';

interface Form10FormProps {
  onSubmit: SubmitHandler<Form10Data>;
  initialData?: Form10Data;
  isEditing: boolean;
  onCancel: () => void;
}

const Form10Form: React.FC<Form10FormProps> = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Form10Data>({
    defaultValues: initialData || { name: '' }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Level Name</label>
        <input
          id="name"
          {...register('name', { required: 'Level name is required' })}
          placeholder="Enter level name"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <button type="submit">{isEditing ? 'Update' : 'Add'} Level</button>
        {isEditing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default Form10Form;