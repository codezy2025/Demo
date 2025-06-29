/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Page Component
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
 * - Add URL-based filtering and search
 * - Implement breadcrumb navigation
 * - Add export/import functionality
 * - Include real-time updates (WebSocket/SSE)
 * - Add keyboard shortcuts for common actions
 * - Implement undo/redo functionality
 * 
 * 💡 State Management Improvements:
 * - Use useReducer for complex state logic
 * - Add optimistic updates for better UX
 * - Implement proper error boundaries
 * - Add loading skeletons instead of spinners
 * 
 * 🔧 User Experience:
 * - Add confirmation dialogs for destructive actions
 * - Implement toast notifications for feedback
 * - Add drag-and-drop for reordering
 * - Include accessibility features (ARIA labels)
 * 
 * 📱 Responsive Design:
 * - Add mobile-specific components
 * - Implement swipe actions for mobile
 * - Consider drawer/modal layouts for small screens
 */

import React, { useState, useEffect } from 'react';
import ValidatorForm from '../components/ValidatorForm';
import ValidatorList from '../components/ValidatorList';
import validatorService from '../services/validatorService';
import { Validator } from '../types/ValidatorTypes';

const ValidatorPage: React.FC = () => {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentValidator, setCurrentValidator] = useState<Validator | null>(null);

  useEffect(() => {
    fetchValidators();
  }, []);

  const fetchValidators = async () => {
    try {
      setLoading(true);
      const data = await validatorService.getAll();
      setValidators(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch validators');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (validator: Validator) => {
    try {
      if (currentValidator) {
        await validatorService.update(validator.id, validator);
      } else {
        await validatorService.create(validator);
      }
      await fetchValidators();
      setCurrentValidator(null);
    } catch (err) {
      setError('Failed to save validator');
    }
  };

  const handleEdit = (validator: Validator) => {
    setCurrentValidator(validator);
  };

  const handleDelete = async (id: string) => {
    try {
      await validatorService.delete(id);
      await fetchValidators();
    } catch (err) {
      setError('Failed to delete validator');
    }
  };

  return (
    <div>
      <h1>Validator Management</h1>
      {error && <div className="error">{error}</div>}
      <ValidatorForm 
        onSubmit={handleSubmit} 
        currentValidator={currentValidator} 
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ValidatorList 
          validators={validators} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default ValidatorPage;