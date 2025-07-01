/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Calculator[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{CalculatorStats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { Calculator, CalculatorInput } from '../types/CalculatorTypes';

const API_BASE_URL = 'http://localhost:3000/api/calculators';

const getAll = async (): Promise<Calculator[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

const create = async (calculatorData: CalculatorInput): Promise<Calculator> => {
  const response = await axios.post(API_BASE_URL, calculatorData);
  return response.data;
};

const update = async (id: string, calculatorData: CalculatorInput): Promise<Calculator> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, calculatorData);
  return response.data;
};

const deleteCalculator = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const calculatorService = {
  getAll,
  create,
  update,
  delete: deleteCalculator
};