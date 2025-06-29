/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator Types
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
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Calculator>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum CalculatorStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type CalculatorSearchParams = Pick<Calculator, 'name' | 'status'>
 * - export type CalculatorUpdateData = Partial<Omit<Calculator, 'id' | 'createdAt'>>
 */

export interface Calculator {
  currentInput: string;
  previousInput: string;
  operation: string | null;
  resetScreen: boolean;
}

export interface CalculatorFormData {
  txtInput: string;
}