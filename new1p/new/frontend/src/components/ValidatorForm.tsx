/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Form Component
 * 
 * 📋 Original Requirements: Create React TSX components for a numeric validator module that mirrors the Python validator.py functionality. Include:
1. A form component with input field and validation display
2. Types for the validator
3. A service that implements the validation logic
4. A page component that brings it all together

The validation should:
- Check if input can be converted to a number
- Return true/false result
- Handle all edge cases mentioned in the docs
- Display appropriate validation messages
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
 * - initialData?: Partial<Validator> (for edit mode)
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
import { ValidatorFormData } from '../types/ValidatorTypes';
import { validateNumber } from '../services/validatorService';

interface ValidatorFormProps {
  onSubmit: (data: ValidatorFormData) => void;
}

const ValidatorForm: React.FC<ValidatorFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ValidatorFormData>();

  const inputValue = watch('input');

  const validateInput = (value: string) => {
    const { isValid } = validateNumber(value);
    return isValid || 'Invalid number';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input">Number to validate:</label>
        <input
          id="input"
          type="text"
          {...register('input', {
            required: 'This field is required',
            validate: validateInput,
          })}
        />
        {errors.input && <span>{errors.input.message}</span>}
      </div>

      <div>
        <p>
          Validation result:{' '}
          {inputValue
            ? validateNumber(inputValue).isValid
              ? 'Valid'
              : 'Invalid'
            : '--'}
        </p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ValidatorForm;