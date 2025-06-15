/**
 * 🏗️  DEVELOPMENT GUIDE - List Form Component
 * 
 * 📋 Original Requirements: Create NotificationList.tsx with:
1. System notification display
2. Movement history tracking
3. Restore functionality
4. Clean UI matching the Java version's tray menu
5. TypeScript typing for all props
6. Responsive design for different notification types
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
 * - initialData?: Partial<List> (for edit mode)
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
import { ListFormData, NotificationType } from '../types/ListTypes';

interface ListFormProps {
  onSubmit: (data: ListFormData) => void;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ListFormData>();

  const handleFormSubmit = (data: ListFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="list-form">
      <div className="form-group">
        <label htmlFor="notificationType">Notification Type</label>
        <select
          id="notificationType"
          {...register('notificationType', { required: 'Notification type is required' })}
          className={`form-control ${errors.notificationType ? 'is-invalid' : ''}`}
        >
          {Object.values(NotificationType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.notificationType && (
          <div className="invalid-feedback">{errors.notificationType.message}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          {...register('message', { required: 'Message is required' })}
          className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          rows={3}
        />
        {errors.message && (
          <div className="invalid-feedback">{errors.message.message}</div>
        )}
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          id="trackMovement"
          {...register('trackMovement')}
          className="form-check-input"
        />
        <label htmlFor="trackMovement" className="form-check-label">
          Track Movement History
        </label>
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          id="enableRestore"
          {...register('enableRestore')}
          className="form-check-input"
        />
        <label htmlFor="enableRestore" className="form-check-label">
          Enable Restore Functionality
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Create Notification
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="btn btn-secondary ml-2"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default ListForm;