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

import React, { useState, useEffect } from 'react';
import Form10Form from '../components/Form10Form';
import Form10List from '../components/Form10List';
import form10Service from '../services/form10Service';
import { Form10, Form10Create, Form10Update } from '../types/Form10Types';

const Form10Page: React.FC = () => {
  const [forms, setForms] = useState<Form10[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<Form10 | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await form10Service.getAll();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: Form10Create) => {
    try {
      setLoading(true);
      const newForm = await form10Service.create(formData);
      setForms([...forms, newForm]);
      setError(null);
    } catch (err) {
      setError('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: Form10Update) => {
    try {
      setLoading(true);
      const updatedForm = await form10Service.update(id, formData);
      setForms(forms.map(form => form.id === id ? updatedForm : form));
      setSelectedForm(null);
      setError(null);
    } catch (err) {
      setError('Failed to update form');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await form10Service.delete(id);
      setForms(forms.filter(form => form.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Form10 Management</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Loading...</div>}
      
      <Form10Form 
        onSubmit={selectedForm ? (data) => handleUpdate(selectedForm.id, data) : handleCreate}
        initialData={selectedForm}
        onCancel={() => setSelectedForm(null)}
      />
      
      <Form10List 
        forms={forms} 
        onEdit={setSelectedForm} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default Form10Page;