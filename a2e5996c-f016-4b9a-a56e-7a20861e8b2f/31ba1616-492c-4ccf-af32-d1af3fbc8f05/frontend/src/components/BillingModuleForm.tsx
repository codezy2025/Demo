/**
 * 🏗️  DEVELOPMENT GUIDE - Billing Module Form Component
 * 
 * 📋 Original Requirements: Generate React TSX files for: 1) CartPage component with item management and tax calculation, 2) BillsPage component for displaying invoice history, 3) BillingService for API calls, and 4) TypeScript interfaces matching the Mongoose schema
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
 * - initialData?: Partial<Billing Module> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { BillingFormData } from '../types/BillingModuleTypes';

interface BillingModuleFormProps {
  onSubmit: (data: BillingFormData) => void;
}

const BillingModuleForm: React.FC<BillingModuleFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BillingFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="customerName">Customer Name</label>
        <input
          id="customerName"
          {...register('customerName', { required: 'Customer name is required' })}
        />
        {errors.customerName && <span>{errors.customerName.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <span>{errors.address.message}</span>}
      </div>

      <div>
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          {...register('paymentMethod', { required: 'Payment method is required' })}
        >
          <option value="">Select payment method</option>
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="cash">Cash</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
        {errors.paymentMethod && <span>{errors.paymentMethod.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BillingModuleForm;