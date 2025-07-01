/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator Page Component
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
import CalculatorForm from '../components/CalculatorForm';
import CalculatorList from '../components/CalculatorList';
import calculatorService from '../services/calculatorService';
import { Calculation, CalculationInput } from '../types/CalculatorTypes';

const CalculatorPage: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCalculations();
  }, []);

  const fetchCalculations = async () => {
    try {
      setLoading(true);
      const data = await calculatorService.getAll();
      setCalculations(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch calculations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (input: CalculationInput) => {
    try {
      setLoading(true);
      const newCalculation = await calculatorService.create(input);
      setCalculations([...calculations, newCalculation]);
      setError(null);
    } catch (err) {
      setError('Failed to create calculation');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await calculatorService.delete(id);
      setCalculations(calculations.filter(calc => calc.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete calculation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      {error && <div className="error">{error}</div>}
      <CalculatorForm onSubmit={handleSubmit} loading={loading} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CalculatorList 
          calculations={calculations} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default CalculatorPage;