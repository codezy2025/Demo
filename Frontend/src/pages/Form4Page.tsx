/**
 * 🏗️  DEVELOPMENT GUIDE - Form4 Form Component
 * 
 * 📋 Original Requirements: Create a React TSX implementation of a section selection form with the following requirements:
1. Display section information for a selected academic level
2. Allow level selection through a modal dialog
3. Show section details including name, capacity, and requirements
4. Validate section capacity before selection
5. Integrate with parent component for enrollment
6. Include cancel functionality
7. Maintain state for selected level and section
8. Use TypeScript interfaces for data types
9. Implement proper error handling
10. Follow modern React best practices
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
 * - initialData?: Partial<Form4> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React, { useState, useEffect } from 'react';
import Form4Form from '../components/Form4Form';
import Form4List from '../components/Form4List';
import form4Service from '../services/form4Service';
import { Form4, Form4Create, Form4Update } from '../types/Form4Types';

const Form4Page: React.FC = () => {
  const [forms, setForms] = useState<Form4[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<Form4 | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await form4Service.getAll();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: Form4Create) => {
    try {
      setLoading(true);
      const newForm = await form4Service.create(formData);
      setForms([...forms, newForm]);
      setError(null);
    } catch (err) {
      setError('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: Form4Update) => {
    try {
      setLoading(true);
      const updatedForm = await form4Service.update(id, formData);
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
      await form4Service.delete(id);
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
      <h1>Form4 Management</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      
      <Form4Form 
        onSubmit={selectedForm ? (data) => handleUpdate(selectedForm.id, data) : handleCreate}
        initialData={selectedForm}
        onCancel={() => setSelectedForm(null)}
      />
      
      <Form4List 
        forms={forms}
        onEdit={setSelectedForm}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Form4Page;