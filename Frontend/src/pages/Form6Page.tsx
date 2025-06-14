/**
 * 🏗️  DEVELOPMENT GUIDE - Form6 Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the Student Enrollment Form with the following requirements:

1. Form Sections:
   - Personal Information (name, gender, birth date, address)
   - Family Background (parents' names, occupations, contact)
   - Academic Information (status, general average, level/section)

2. Features:
   - Auto-calculated age from birth date
   - Form validation for required fields
   - Integration with backend services for saving data
   - Section assignment functionality

3. Data Types:
   - Student interface matching the database schema
   - Form state management

4. Components:
   - Main form with tabbed sections
   - Input components with validation
   - Action buttons (Save, Cancel, Clear)
   - Section selection modal

5. Business Rules:
   - Required field validation
   - Age calculation
   - Status handling (New/Old/Drop)
   - Section assignment validation
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
 * - initialData?: Partial<Form6> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React, { useState, useEffect } from 'react';
import Form6Form from '../components/Form6Form';
import Form6List from '../components/Form6List';
import form6Service from '../services/form6Service';
import { Form6 } from '../types/Form6Types';

const Form6Page: React.FC = () => {
    const [forms, setForms] = useState<Form6[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentForm, setCurrentForm] = useState<Form6 | null>(null);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            setLoading(true);
            const data = await form6Service.getAll();
            setForms(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch forms');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: Form6) => {
        try {
            if (currentForm) {
                await form6Service.update(currentForm.id, formData);
            } else {
                await form6Service.create(formData);
            }
            fetchForms();
            setCurrentForm(null);
        } catch (err) {
            setError('Failed to save form');
        }
    };

    const handleEdit = (form: Form6) => {
        setCurrentForm(form);
    };

    const handleDelete = async (id: string) => {
        try {
            await form6Service.delete(id);
            fetchForms();
        } catch (err) {
            setError('Failed to delete form');
        }
    };

    const handleCancel = () => {
        setCurrentForm(null);
    };

    return (
        <div>
            <h1>Form6 Management</h1>
            {error && <div className="error">{error}</div>}
            <Form6Form 
                onSubmit={handleSubmit} 
                onCancel={handleCancel} 
                initialValues={currentForm} 
            />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Form6List 
                    forms={forms} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}
        </div>
    );
};

export default Form6Page;