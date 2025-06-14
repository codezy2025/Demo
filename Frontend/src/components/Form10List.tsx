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

import React, { useState } from 'react';
import { Form10 } from '../types/Form10Types';

interface Form10ListProps {
  data: Form10[];
  onEdit: (id: string, data: Form10) => void;
  onDelete: (id: string) => void;
}

const Form10List: React.FC<Form10ListProps> = ({ data, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Form10>>({});
  const [error, setError] = useState<string | null>(null);

  const handleEditClick = (item: Form10) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setError(null);
  };

  const handleSave = () => {
    if (!editData.name?.trim()) {
      setError('Level name cannot be empty');
      return;
    }

    if (editingId) {
      onEdit(editingId, editData as Form10);
      setEditingId(null);
      setEditData({});
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Level Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name || ''}
                    onChange={handleChange}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <>
                    <button onClick={handleSave}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form10List;