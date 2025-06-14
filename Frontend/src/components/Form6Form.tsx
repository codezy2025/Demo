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
import { useForm, SubmitHandler } from 'react-hook-form';
import { Student, Form6Types } from '../types/Form6Types';

interface Form6FormProps {
  onSubmit: SubmitHandler<Student>;
}

const Form6Form: React.FC<Form6FormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Student>();
  const [activeTab, setActiveTab] = useState<'personal' | 'family' | 'academic'>('personal');
  const [showSectionModal, setShowSectionModal] = useState(false);

  const birthDate = watch('birthDate');
  
  useEffect(() => {
    if (birthDate) {
      const age = calculateAge(new Date(birthDate));
      setValue('age', age);
    }
  }, [birthDate, setValue]);

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleTabChange = (tab: 'personal' | 'family' | 'academic') => {
    setActiveTab(tab);
  };

  const handleSectionSelect = (section: string) => {
    setValue('section', section);
    setShowSectionModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex border-b">
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === 'personal' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleTabChange('personal')}
        >
          Personal Information
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === 'family' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleTabChange('family')}
        >
          Family Background
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === 'academic' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleTabChange('academic')}
        >
          Academic Information
        </button>
      </div>

      {activeTab === 'personal' && (
        <div className="space-y-4">
          <div>
            <label>Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label>Gender</label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
          </div>

          <div>
            <label>Birth Date</label>
            <input
              type="date"
              {...register('birthDate', { required: 'Birth date is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}
          </div>

          <div>
            <label>Age</label>
            <input
              {...register('age')}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label>Address</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
          </div>
        </div>
      )}

      {activeTab === 'family' && (
        <div className="space-y-4">
          <div>
            <label>Father's Name</label>
            <input
              {...register('fatherName', { required: "Father's name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.fatherName && <span className="text-red-500">{errors.fatherName.message}</span>}
          </div>

          <div>
            <label>Father's Occupation</label>
            <input
              {...register('fatherOccupation')}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Mother's Name</label>
            <input
              {...register('motherName', { required: "Mother's name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.motherName && <span className="text-red-500">{errors.motherName.message}</span>}
          </div>

          <div>
            <label>Mother's Occupation</label>
            <input
              {...register('motherOccupation')}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Contact Number</label>
            <input
              {...register('contactNumber', { required: 'Contact number is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.contactNumber && <span className="text-red-500">{errors.contactNumber.message}</span>}
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="space-y-4">
          <div>
            <label>Status</label>
            <select
              {...register('status', { required: 'Status is required' })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="new">New</option>
              <option value="old">Old</option>
              <option value="drop">Drop</option>
            </select>
            {errors.status && <span className="text-red-500">{errors.status.message}</span>}
          </div>

          <div>
            <label>General Average</label>
            <input
              type="number"
              step="0.01"
              {...register('generalAverage', { required: 'General average is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.generalAverage && <span className="text-red-500">{errors.generalAverage.message}</span>}
          </div>

          <div>
            <label>Level/Section</label>
            <div className="flex">
              <input
                {...register('section', { required: 'Section is required' })}
                className="w-full p-2 border rounded"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowSectionModal(true)}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Select
              </button>
            </div>
            {errors.section && <span className="text-red-500">{errors.section.message}</span>}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => {}}
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>

      {showSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h3>Select Section</h3>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {['6-A', '6-B', '6-C', '6-D', '6-E'].map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => handleSectionSelect(section)}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  {section}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowSectionModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form6Form;