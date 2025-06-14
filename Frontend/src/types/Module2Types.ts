/**
 * 🏗️  DEVELOPMENT GUIDE - Module2 Types
 * 
 * 📋 Original Requirements: Create React TypeScript components for a frontend that would interface with the Module2 database backend described. This should include:
1. A DatabaseService module for handling all API calls (connection, queries, user tracking)
2. Type definitions for all data structures
3. A Login/Logout component for user tracking
4. A DataTable component for displaying recordsets
5. A ConnectionStatus component showing database connection state
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Module2>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Module2Status { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Module2SearchParams = Pick<Module2, 'name' | 'status'>
 * - export type Module2UpdateData = Partial<Omit<Module2, 'id' | 'createdAt'>>
 */

export interface Module2 {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface Module2FormData {
  name: string;
  description: string;
}