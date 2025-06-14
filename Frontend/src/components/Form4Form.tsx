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
import { useForm } from 'react-hook-form';
import { Form4Data, AcademicLevel, Section } from '../types/Form4Types';

interface Form4FormProps {
  onSubmit: (data: Form4Data) => void;
  academicLevels: AcademicLevel[];
}

const Form4Form: React.FC<Form4FormProps> = ({ onSubmit, academicLevels }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Form4Data>();
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const handleLevelSelect = (level: AcademicLevel) => {
    setSelectedLevel(level);
    setShowLevelModal(false);
  };

  const handleSectionSelect = (section: Section) => {
    if (section.currentCapacity < section.maxCapacity) {
      setSelectedSection(section);
    }
  };

  const handleCancel = () => {
    setSelectedLevel(null);
    setSelectedSection(null);
    reset();
  };

  const submitForm = (data: Form4Data) => {
    if (selectedLevel && selectedSection) {
      onSubmit({
        ...data,
        academicLevel: selectedLevel,
        section: selectedSection
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <button type="button" onClick={() => setShowLevelModal(true)}>
          {selectedLevel ? selectedLevel.name : 'Select Academic Level'}
        </button>
        {errors.academicLevel && <span>Academic level is required</span>}
      </div>

      {selectedLevel && (
        <div>
          <h3>Sections for {selectedLevel.name}</h3>
          <ul>
            {selectedLevel.sections.map((section) => (
              <li key={section.id}>
                <div>
                  <h4>{section.name}</h4>
                  <p>Capacity: {section.currentCapacity}/{section.maxCapacity}</p>
                  <p>Requirements: {section.requirements}</p>
                  <button
                    type="button"
                    onClick={() => handleSectionSelect(section)}
                    disabled={section.currentCapacity >= section.maxCapacity}
                  >
                    {selectedSection?.id === section.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showLevelModal && (
        <div className="modal">
          <h2>Select Academic Level</h2>
          <ul>
            {academicLevels.map((level) => (
              <li key={level.id}>
                <button type="button" onClick={() => handleLevelSelect(level)}>
                  {level.name}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setShowLevelModal(false)}>
            Close
          </button>
        </div>
      )}

      <div>
        <button type="submit" disabled={!selectedLevel || !selectedSection}>
          Submit
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form4Form;