/**
 * 🏗️  DEVELOPMENT GUIDE - Validator Types
 * 
 * 📋 Original Requirements: Create React TSX components for a numeric validator module that mirrors the Python validator.py functionality. Include:
1. A form component with input field and validation display
2. Types for the validator
3. A service that implements the validation logic
4. A page component that brings it all together

The validation should:
- Check if input can be converted to a number
- Return true/false result
- Handle all edge cases mentioned in the docs
- Display appropriate validation messages
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Validator>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum ValidatorStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type ValidatorSearchParams = Pick<Validator, 'name' | 'status'>
 * - export type ValidatorUpdateData = Partial<Omit<Validator, 'id' | 'createdAt'>>
 */

export interface Validator {
  isValid: boolean;
  message: string;
  value: number | null;
}

export interface ValidatorFormData {
  input: string;
}