/**
 * 🏗️  DEVELOPMENT GUIDE - Database Module (Module2) Types
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the Database Module with the following components:
1. A DatabaseService for handling all database operations
2. Types/interfaces for all global variables and data structures
3. Context providers for global state management
4. Utility functions for database operations

Key requirements:
- Use TypeScript interfaces for type safety
- Implement connection management with proper error handling
- Create hooks for common operations
- Include session tracking functionality
- Maintain similar functionality to the original VB6 module
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Database Module (Module2)>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Database Module (Module2)Status { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Database Module (Module2)SearchParams = Pick<Database Module (Module2), 'name' | 'status'>
 * - export type Database Module (Module2)UpdateData = Partial<Omit<Database Module (Module2), 'id' | 'createdAt'>>
 */

export interface DatabaseModule {
  connectionString: string;
  isConnected: boolean;
  lastActivity: Date;
  sessionId: string;
  maxRetryAttempts: number;
  currentTransactionId?: string;
  queryTimeout: number;
}

export interface DatabaseModuleFormData {
  serverName: string;
  databaseName: string;
  username: string;
  password: string;
  useIntegratedSecurity: boolean;
  connectionTimeout: number;
  enableSessionTracking: boolean;
}