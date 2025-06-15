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

import React, { useState } from 'react';
import { Form4Data, Section } from '../types/Form4Types';

interface Form4ListProps {
  data: Form4Data[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Form4List: React.FC<Form4ListProps> = ({ data, onEdit, onDelete }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setSelectedSection(null);
    setIsModalOpen(true);
  };

  const handleSectionSelect = (section: Section) => {
    if (section.capacity <= 0) {
      setError('This section has no available capacity');
      return;
    }
    setSelectedSection(section);
    setError(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedLevel('');
    setSelectedSection(null);
    setError(null);
  };

  const handleEnroll = () => {
    if (!selectedSection) {
      setError('Please select a section');
      return;
    }
    // Integration with parent component would go here
    setIsModalOpen(false);
  };

  return (
    <div className="form4-list">
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.level}</td>
              <td>
                <button onClick={() => handleLevelSelect(item.level)}>Select</button>
                <button onClick={() => onEdit(item.id)}>Edit</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Section for {selectedLevel}</h2>
            {error && <div className="error">{error}</div>}
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Requirements</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .find((item) => item.level === selectedLevel)
                  ?.sections.map((section) => (
                    <tr key={section.id}>
                      <td>{section.name}</td>
                      <td>{section.capacity}</td>
                      <td>{section.requirements}</td>
                      <td>
                        <button onClick={() => handleSectionSelect(section)}>
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="modal-actions">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleEnroll} disabled={!selectedSection}>
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form4List;