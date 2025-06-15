/**
 * 🏗️  DEVELOPMENT GUIDE - Module2Service Service
 * 
 * 📋 Original Requirements: Create a TypeScript service module that provides frontend equivalents to the Module2 database functionality. This should be an API service layer that would communicate with a backend that handles the actual database operations.

Key Features to Implement:
1. Database connection management (abstracted as API configuration)
2. Recordset operations (as API calls returning data)
3. User activity tracking (login/logout API calls)
4. Global state management (using React context instead of global variables)

Include proper TypeScript interfaces for all data types and API responses.
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
 * - search(query: string): Promise<Module2Service[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Module2ServiceStats}>
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

export interface Module2Service {
  configureAPI(config: APIConfig): Promise<void>;
  fetchRecords(query: RecordQuery): Promise<RecordSet>;
  createRecord(data: RecordData): Promise<RecordResponse>;
  updateRecord(id: string, data: RecordData): Promise<RecordResponse>;
  deleteRecord(id: string): Promise<DeleteResponse>;
  trackLogin(userId: string): Promise<ActivityResponse>;
  trackLogout(userId: string): Promise<ActivityResponse>;
  getGlobalState(): Promise<GlobalState>;
  setGlobalState(state: GlobalState): Promise<void>;
}

export interface Module2ServiceFormData {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}