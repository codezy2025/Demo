/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator Types
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
  a: number | null;
  b: number | null;
  c: number | null;
  currentAction: string | null;
  txtInput: string;
}

export interface CalculatorFormData {
  txtInput: string;
  Command1: string;
  Command2: string;
  Command3: string;
  Command4: string;
  Command5: string;
  Command6: string;
  Command7: string;
  Command8: string;
  Command9: string;
  Command10: string;
  Command11: string;
  Command12: string;
  Command13: string;
  Command14: string;
  Command15: string;
  Command16: string;
  Command17: string;
}