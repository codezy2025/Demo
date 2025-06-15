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
import Form12Form from '../components/Form12Form';
import Form12List from '../components/Form12List';
import form12Service from '../services/form12Service';
import { Form12, Form12SubmitData } from '../types/Form12Types';

const Form12Page: React.FC = () => {
  const [forms, setForms] = useState<Form12[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<Form12 | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await form12Service.getAll();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Form12SubmitData) => {
    try {
      if (selectedForm) {
        await form12Service.update(selectedForm.id, formData);
      } else {
        await form12Service.create(formData);
      }
      setSelectedForm(null);
      await fetchForms();
    } catch (err) {
      setError('Failed to save form');
    }
  };

  const handleEdit = (form: Form12) => {
    setSelectedForm(form);
  };

  const handleDelete = async (id: string) => {
    try {
      await form12Service.delete(id);
      await fetchForms();
    } catch (err) {
      setError('Failed to delete form');
    }
  };

  return (
    <div>
      <h1>Form 12</h1>
      {error && <div className="error">{error}</div>}
      <Form12Form 
        onSubmit={handleSubmit} 
        initialData={selectedForm} 
        onCancel={() => setSelectedForm(null)} 
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form12List 
          forms={forms} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default Form12Page;