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

import React, { useState, useEffect } from 'react';
import FormForm from '../components/FormForm';
import FormList from '../components/FormList';
import formService from '../services/formService';
import { FormData } from '../types/FormTypes';

const FormPage: React.FC = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await formService.getAll();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await formService.create(formData);
      await fetchForms();
    } catch (err) {
      setError('Failed to create form');
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await formService.update(formData.id, formData);
      await fetchForms();
      setSelectedForm(null);
    } catch (err) {
      setError('Failed to update form');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await formService.delete(id);
      await fetchForms();
    } catch (err) {
      setError('Failed to delete form');
    }
  };

  const handleSelect = (form: FormData) => {
    setSelectedForm(form);
  };

  const handleCancel = () => {
    setSelectedForm(null);
  };

  return (
    <div>
      <h1>Form Management</h1>
      {error && <div className="error">{error}</div>}
      <FormForm
        onSubmit={selectedForm ? handleUpdate : handleCreate}
        onCancel={handleCancel}
        initialData={selectedForm}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <FormList
          forms={forms}
          onEdit={handleSelect}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default FormPage;