/**
 * 🏗️  DEVELOPMENT GUIDE - Form Form Component
 * 
 * 📋 Original Requirements: Create ControlPanelForm.tsx with:
- Start/Hide button that triggers mouse movement
- Stop/Exit button for termination
- Status indicators for movement activity
- Settings display for interval configuration
- Proper TypeScript typing
- Clean UI matching the Java version's layout
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
 * - initialData?: Partial<Form> (for edit mode)
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
import { FormTypes } from '../types/FormTypes';

interface ControlPanelFormProps {
  onSubmit: SubmitHandler<FormTypes.ControlPanelFormData>;
  isMoving: boolean;
  interval: number;
}

const ControlPanelForm: React.FC<ControlPanelFormProps> = ({ onSubmit, isMoving, interval }) => {
  const { handleSubmit, register, setValue } = useForm<FormTypes.ControlPanelFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="control-panel-form">
      <div className="form-section">
        <button
          type="submit"
          name="action"
          value={isMoving ? 'hide' : 'start'}
          className="control-button"
          ref={register}
        >
          {isMoving ? 'Hide' : 'Start'}
        </button>

        <button
          type="submit"
          name="action"
          value="stop"
          className="control-button"
          ref={register}
        >
          Stop
        </button>
      </div>

      <div className="status-section">
        <div className="status-indicator">
          <span>Status: </span>
          <span className={isMoving ? 'active' : 'inactive'}>
            {isMoving ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="settings-section">
        <label>
          Interval (ms):
          <input
            type="number"
            name="interval"
            defaultValue={interval}
            ref={register}
            onChange={(e) => setValue('interval', parseInt(e.target.value))}
            min="100"
            step="100"
          />
        </label>
      </div>
    </form>
  );
};

export default ControlPanelForm;