/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript calculator component that mimics the VB6 Form1.frm functionality. Include:
1. A display TextBox equivalent (txtInput)
2. Buttons for digits 0-9 (Command1-Command10)
3. Decimal point button (Command11)
4. Operator buttons (+, -, *, /) (Command12-Command15)
5. Equals button (=) (Command16)
6. Reset button (Command17)
7. State management for operands (a, b), result (c), and current action
8. Basic calculation logic with the same behavior as the VB6 version
9. No error handling (matching original behavior)
10. Simple styling to make it look like a basic calculator
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
 * - initialData?: Partial<Calculator> (for edit mode)
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
import { CalculatorFormData } from '../types/CalculatorTypes';

interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormData) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<CalculatorFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="calculator-form">
      <div className="calculator-display">
        <input
          type="text"
          {...register('displayValue')}
          id="txtInput"
          readOnly
          className="calculator-input"
        />
      </div>
      <div className="calculator-buttons">
        <button type="button" {...register('Command1')} className="calculator-button">7</button>
        <button type="button" {...register('Command2')} className="calculator-button">8</button>
        <button type="button" {...register('Command3')} className="calculator-button">9</button>
        <button type="button" {...register('Command12')} className="calculator-button operator">/</button>

        <button type="button" {...register('Command4')} className="calculator-button">4</button>
        <button type="button" {...register('Command5')} className="calculator-button">5</button>
        <button type="button" {...register('Command6')} className="calculator-button">6</button>
        <button type="button" {...register('Command13')} className="calculator-button operator">*</button>

        <button type="button" {...register('Command7')} className="calculator-button">1</button>
        <button type="button" {...register('Command8')} className="calculator-button">2</button>
        <button type="button" {...register('Command9')} className="calculator-button">3</button>
        <button type="button" {...register('Command14')} className="calculator-button operator">-</button>

        <button type="button" {...register('Command11')} className="calculator-button">.</button>
        <button type="button" {...register('Command10')} className="calculator-button">0</button>
        <button type="button" {...register('Command16')} className="calculator-button equals">=</button>
        <button type="button" {...register('Command15')} className="calculator-button operator">+</button>

        <button type="button" {...register('Command17')} onClick={() => reset()} className="calculator-button reset">C</button>
      </div>
    </form>
  );
};

export default CalculatorForm;