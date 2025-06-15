/**
 * 🏗️  DEVELOPMENT GUIDE - Module1 Types
 * 
 * 📋 Original Requirements: Convert the VB6 Module1 utilities to React TypeScript components and hooks. Create separate files for form utilities, list utilities, validation utilities, and database utilities. Use modern React patterns like hooks and context for state management. Include TypeScript interfaces for all function parameters and return types.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Module1>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Module1Status { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Module1SearchParams = Pick<Module1, 'name' | 'status'>
 * - export type Module1UpdateData = Partial<Omit<Module1, 'id' | 'createdAt'>>
 */

export interface Module1 {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Module1FormData {
  name: string;
  description: string;
  isActive: boolean;
}