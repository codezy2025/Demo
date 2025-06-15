/**
 * 🏗️  DEVELOPMENT GUIDE - Form1 Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the student management form with the following features:
1. A data table displaying student records with columns: Student Number, Last Name, First Name, Middle Name, Gender, Status, School Year, Level/Grade, Section
2. Action buttons for: Add Student, Edit Student, Delete Student, Assign Section, Print Student List, Print Registration Slip, Advanced Search, Filter Options, Reload Data
3. Status bar showing record count
4. Integration with other forms (modal dialogs) for add/edit, section assignment, search and filtering
5. All the database operations described in the documentation
6. Proper TypeScript interfaces for student data
7. React hooks for state management
8. Error handling and user confirmation dialogs
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
 * - initialData?: Partial<Form1> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React, { useState, useEffect } from 'react';
import Form1Form from '../components/Form1Form';
import Form1List from '../components/Form1List';
import form1Service from '../services/form1Service';
import { Form1, Form1Create, Form1Update } from '../types/Form1Types';

const Form1Page: React.FC = () => {
  const [forms, setForms] = useState<Form1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<Form1 | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const data = await form1Service.getAll();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: Form1Create) => {
    try {
      setLoading(true);
      const newForm = await form1Service.create(formData);
      setForms([...forms, newForm]);
      setError(null);
    } catch (err) {
      setError('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: Form1Update) => {
    try {
      setLoading(true);
      const updatedForm = await form1Service.update(id, formData);
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
      await form1Service.delete(id);
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
      <h1>Form1 Management</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      
      <Form1Form 
        onSubmit={selectedForm ? (data) => handleUpdate(selectedForm.id, data) : handleCreate}
        initialData={selectedForm}
        onCancel={() => setSelectedForm(null)}
      />
      
      <Form1List 
        forms={forms} 
        onEdit={setSelectedForm} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default Form1Page;