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
import { Student } from '../types/Form6Types';

interface StudentEnrollmentFormProps {
  initialData?: Student;
  onSave: (data: Student) => void;
  onCancel: () => void;
}

const StudentEnrollmentForm: React.FC<StudentEnrollmentFormProps> = ({ initialData, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'family' | 'academic'>('personal');
  const [formData, setFormData] = useState<Student>({
    id: '',
    name: '',
    gender: '',
    birthDate: '',
    address: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    contactNumber: '',
    status: 'New',
    generalAverage: 0,
    level: '',
    section: '',
    age: 0,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSectionModal, setShowSectionModal] = useState(false);

  useEffect(() => {
    if (formData.birthDate) {
      const age = calculateAge(formData.birthDate);
      setFormData(prev => ({ ...prev, age }));
    }
  }, [formData.birthDate]);

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
    if (!formData.motherName) newErrors.motherName = "Mother's name is required";
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.section) newErrors.section = 'Section is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClear = () => {
    setFormData({
      id: '',
      name: '',
      gender: '',
      birthDate: '',
      address: '',
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      contactNumber: '',
      status: 'New',
      generalAverage: 0,
      level: '',
      section: '',
      age: 0,
    });
    setErrors({});
  };

  const handleSectionSelect = (section: string) => {
    setFormData(prev => ({ ...prev, section }));
    setShowSectionModal(false);
  };

  return (
    <div className="student-enrollment-form">
      <div className="form-tabs">
        <button
          className={activeTab === 'personal' ? 'active' : ''}
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button
          className={activeTab === 'family' ? 'active' : ''}
          onClick={() => setActiveTab('family')}
        >
          Family Background
        </button>
        <button
          className={activeTab === 'academic' ? 'active' : ''}
          onClick={() => setActiveTab('academic')}
        >
          Academic Information
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'personal' && (
          <div className="form-section">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label>Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={errors.birthDate ? 'error' : ''}
              />
              {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="form-section">
            <div className="form-group">
              <label>Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className={errors.fatherName ? 'error' : ''}
              />
              {errors.fatherName && <span className="error-message">{errors.fatherName}</span>}
            </div>

            <div className="form-group">
              <label>Father's Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                className={errors.motherName ? 'error' : ''}
              />
              {errors.motherName && <span className="error-message">{errors.motherName}</span>}
            </div>

            <div className="form-group">
              <label>Mother's Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={errors.contactNumber ? 'error' : ''}
              />
              {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="form-section">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={errors.status ? 'error' : ''}
              >
                <option value="New">New</option>
                <option value="Old">Old</option>
                <option value="Drop">Drop</option>
              </select>
              {errors.status && <span className="error-message">{errors.status}</span>}
            </div>

            <div className="form-group">
              <label>General Average</label>
              <input
                type="number"
                name="generalAverage"
                value={formData.generalAverage}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label>Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className={errors.level ? 'error' : ''}
              >
                <option value="">Select Level</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
              </select>
              {errors.level && <span className="error-message">{errors.level}</span>}
            </div>

            <div className="form-group">
              <label>Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onClick={() => setShowSectionModal(true)}
                readOnly
                className={errors.section ? 'error' : ''}
              />
              {errors.section && <span className="error-message">{errors.section}</span>}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
        </div>
      </form>

      {showSectionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Section</h3>
            <div className="section-options">
              <button onClick={() => handleSectionSelect('A')}>Section A</button>
              <button onClick={() => handleSectionSelect('B')}>Section B</button>
              <button onClick={() => handleSectionSelect('C')}>Section C</button>
            </div>
            <button className="close-btn" onClick={() => setShowSectionModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollmentForm;