/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript calculator component that replicates the functionality of the VB6 Form1.frm module. Include:
1. A display textbox (txtInput)
2. Digit buttons (0-9)
3. Decimal point button
4. Operator buttons (+, -, *, /)
5. Equals button (=)
6. Reset button
7. State management for operands and operations
8. Basic calculation logic
9. No error handling (matching original behavior)
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
  const { register, handleSubmit, reset, setValue, watch } = useForm<CalculatorFormData>({
    defaultValues: {
      input: '0',
      operand1: null,
      operand2: null,
      operation: null,
      resetInput: false
    }
  });

  const currentInput = watch('input');

  const handleDigitClick = (digit: string) => {
    const input = currentInput === '0' || watch('resetInput') ? digit : currentInput + digit;
    setValue('input', input);
    setValue('resetInput', false);
  };

  const handleDecimalClick = () => {
    if (!currentInput.includes('.')) {
      setValue('input', currentInput + '.');
      setValue('resetInput', false);
    }
  };

  const handleOperatorClick = (operator: string) => {
    const currentValue = parseFloat(currentInput);
    if (watch('operand1') === null) {
      setValue('operand1', currentValue);
    } else if (watch('operation') && !watch('resetInput')) {
      const result = calculate();
      setValue('operand1', result);
      setValue('input', result.toString());
    }
    setValue('operation', operator);
    setValue('resetInput', true);
  };

  const handleEqualsClick = () => {
    if (watch('operation') && watch('operand1') !== null) {
      const result = calculate();
      setValue('input', result.toString());
      setValue('operand1', result);
      setValue('operation', null);
      setValue('resetInput', true);
    }
  };

  const handleResetClick = () => {
    reset({
      input: '0',
      operand1: null,
      operand2: null,
      operation: null,
      resetInput: false
    });
  };

  const calculate = (): number => {
    const operand1 = watch('operand1') || 0;
    const operand2 = parseFloat(currentInput);
    const operation = watch('operation');

    switch (operation) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      default:
        return operand2;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('input')}
        readOnly
      />
      
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} type="button" onClick={() => handleDigitClick(num.toString())}>
            {num}
          </button>
        ))}
        <button type="button" onClick={handleDecimalClick}>.</button>
      </div>

      <div>
        {['+', '-', '*', '/'].map((op) => (
          <button key={op} type="button" onClick={() => handleOperatorClick(op)}>
            {op}
          </button>
        ))}
        <button type="button" onClick={handleEqualsClick}>=</button>
        <button type="button" onClick={handleResetClick}>Reset</button>
      </div>
    </form>
  );
};

export default CalculatorForm;