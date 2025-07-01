/**
 * 🏗️  DEVELOPMENT GUIDE - Validator List Component
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
 * - Add search/filter functionality
 * - Implement sorting for all columns
 * - Add bulk operations (delete, update status)
 * - Include export functionality (CSV, PDF)
 * - Add infinite scrolling or virtual scrolling
 * - Implement row selection with checkboxes
 * 
 * 💡 Props to Consider Adding:
 * - searchTerm?: string
 * - filters?: Record<string, any>
 * - sortConfig?: { key: string, direction: 'asc' | 'desc' }
 * - isLoading?: boolean
 * - onBulkAction?: (action: string, ids: string[]) => void
 * 
 * 🔧 Libraries to Consider:
 * - @tanstack/react-table for advanced features
 * - react-window for virtualization
 * - fuse.js for fuzzy search
 */

import React from 'react';
import { Validator } from '../types/ValidatorTypes';

interface ValidatorListProps {
  data: Validator[];
  onEdit: (validator: Validator) => void;
  onDelete: (id: string) => void;
}

const ValidatorList: React.FC<ValidatorListProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Input</th>
          <th>Is Valid</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((validator) => (
          <tr key={validator.id}>
            <td>{validator.id}</td>
            <td>{validator.input}</td>
            <td>{validator.isValid ? 'Yes' : 'No'}</td>
            <td>{validator.message}</td>
            <td>
              <button onClick={() => onEdit(validator)}>Edit</button>
              <button onClick={() => onDelete(validator.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ValidatorList;