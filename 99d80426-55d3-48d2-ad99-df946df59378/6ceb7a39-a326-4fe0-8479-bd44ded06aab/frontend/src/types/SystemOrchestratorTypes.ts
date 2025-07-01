/**
 * 🏗️  DEVELOPMENT GUIDE - SystemOrchestrator Types
 * 
 * 📋 Original Requirements: Generate React TSX files for a frontend interface to the SystemOrchestrator module. The interface should include:
1. QueryForm.tsx - A form for entering natural language queries with session management
2. ResultsDisplay.tsx - A component to display SQL results in table format with explanation
3. StatusPanel.tsx - For showing execution status, errors, and performance metrics
4. ConfigEditor.tsx - A configuration interface matching the YAML structure
5. types.ts - TypeScript interfaces matching QueryRequest and QueryResponse from the backend

Key requirements:
- Use Material-UI components
- Support dark/light theme
- Type-safe props for all components
- Error boundaries around query execution
- Responsive layout for analytics dashboard use
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<SystemOrchestrator>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum SystemOrchestratorStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type SystemOrchestratorSearchParams = Pick<SystemOrchestrator, 'name' | 'status'>
 * - export type SystemOrchestratorUpdateData = Partial<Omit<SystemOrchestrator, 'id' | 'createdAt'>>
 */

export interface SystemOrchestrator {
  id: string;
  name: string;
  description?: string;
  version: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  config: SystemOrchestratorConfig;
  metrics: SystemOrchestratorMetrics;
  lastExecution?: SystemOrchestratorExecution;
}

export interface SystemOrchestratorFormData {
  name: string;
  description?: string;
  isActive: boolean;
  config: SystemOrchestratorConfig;
}

export interface SystemOrchestratorConfig {
  databaseConnection: DatabaseConnectionConfig;
  querySettings: QuerySettings;
  logging: LoggingConfig;
  caching: CachingConfig;
}

export interface DatabaseConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export interface QuerySettings {
  timeout: number;
  maxRows: number;
  allowWriteOperations: boolean;
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  persist: boolean;
  retentionDays: number;
}

export interface CachingConfig {
  enabled: boolean;
  ttl: number;
}

export interface SystemOrchestratorMetrics {
  queryCount: number;
  averageExecutionTime: number;
  errorCount: number;
  lastError?: string;
}

export interface SystemOrchestratorExecution {
  timestamp: Date;
  duration: number;
  query: string;
  success: boolean;
  error?: string;
  rowsAffected?: number;
}