/**
 * 🏗️  DEVELOPMENT GUIDE - Utility Module (Module1) Form Component
 * 
 * 📋 Original Requirements: Convert the VB6 utility module to React TypeScript with the following components:
1. Form positioning utilities (usePos, savePos)
2. Control visibility utilities (useControlVis, saveControlVis)
3. Database operations (deleteRec, getNextId, checkIfExists)
4. UI utilities (fillListView, searchListView, highlightFocus, showError, isEmpty)
5. Helper functions (createSettingsDir, centerForm)

All functions should be properly typed and use modern React hooks where applicable. Include proper error handling and TypeScript interfaces.
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
 * - initialData?: Partial<Utility Module (Module1)> (for edit mode)
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
import { 
  FormPositionData, 
  ControlVisibilityData, 
  DatabaseOperationData, 
  UIUtilityData, 
  HelperFunctionData 
} from '../types/Utility Module (Module1)Types';

interface UtilityModuleFormProps {
  onSubmit: (data: UtilityModuleFormData) => void;
}

type UtilityModuleFormData = {
  formPosition?: FormPositionData;
  controlVisibility?: ControlVisibilityData;
  databaseOperation?: DatabaseOperationData;
  uiUtility?: UIUtilityData;
  helperFunction?: HelperFunctionData;
};

const UtilityModuleForm: React.FC<UtilityModuleFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UtilityModuleFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form Positioning Utilities */}
      <fieldset>
        <legend>Form Positioning</legend>
        <div>
          <label>Form Name</label>
          <input {...register('formPosition.formName', { required: true })} />
          {errors.formPosition?.formName && <span>This field is required</span>}
        </div>
        <div>
          <label>X Position</label>
          <input type="number" {...register('formPosition.xPos', { required: true })} />
          {errors.formPosition?.xPos && <span>This field is required</span>}
        </div>
        <div>
          <label>Y Position</label>
          <input type="number" {...register('formPosition.yPos', { required: true })} />
          {errors.formPosition?.yPos && <span>This field is required</span>}
        </div>
      </fieldset>

      {/* Control Visibility Utilities */}
      <fieldset>
        <legend>Control Visibility</legend>
        <div>
          <label>Control Name</label>
          <input {...register('controlVisibility.controlName', { required: true })} />
          {errors.controlVisibility?.controlName && <span>This field is required</span>}
        </div>
        <div>
          <label>Visible</label>
          <input type="checkbox" {...register('controlVisibility.isVisible')} />
        </div>
      </fieldset>

      {/* Database Operations */}
      <fieldset>
        <legend>Database Operations</legend>
        <div>
          <label>Table Name</label>
          <input {...register('databaseOperation.tableName', { required: true })} />
          {errors.databaseOperation?.tableName && <span>This field is required</span>}
        </div>
        <div>
          <label>Record ID</label>
          <input {...register('databaseOperation.recordId')} />
        </div>
        <div>
          <label>Operation Type</label>
          <select {...register('databaseOperation.operationType', { required: true })}>
            <option value="delete">Delete</option>
            <option value="getNextId">Get Next ID</option>
            <option value="checkExists">Check Exists</option>
          </select>
          {errors.databaseOperation?.operationType && <span>This field is required</span>}
        </div>
      </fieldset>

      {/* UI Utilities */}
      <fieldset>
        <legend>UI Utilities</legend>
        <div>
          <label>List View ID</label>
          <input {...register('uiUtility.listViewId', { required: true })} />
          {errors.uiUtility?.listViewId && <span>This field is required</span>}
        </div>
        <div>
          <label>Search Text</label>
          <input {...register('uiUtility.searchText')} />
        </div>
        <div>
          <label>Error Message</label>
          <input {...register('uiUtility.errorMessage')} />
        </div>
      </fieldset>

      {/* Helper Functions */}
      <fieldset>
        <legend>Helper Functions</legend>
        <div>
          <label>Settings Directory Path</label>
          <input {...register('helperFunction.settingsDirPath')} />
        </div>
        <div>
          <label>Center Form</label>
          <input type="checkbox" {...register('helperFunction.centerForm')} />
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UtilityModuleForm;