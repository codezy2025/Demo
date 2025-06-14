/**
 * 🏗️  DEVELOPMENT GUIDE - Utility Module (Module1) Types
 * 
 * 📋 Original Requirements: Convert the VB6 utility module to React TypeScript with the following components:
1. Form positioning utilities (usePos, savePos)
2. Control visibility utilities (useControlVis, saveControlVis)
3. Database operations (deleteRec, getNextId, checkIfExists)
4. UI utilities (fillListView, searchListView, highlightFocus, showError, isEmpty)
5. Helper functions (createSettingsDir, centerForm)

All functions should be properly typed and use modern React hooks where applicable. Include proper error handling and TypeScript interfaces.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Utility Module (Module1)>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Utility Module (Module1)Status { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Utility Module (Module1)SearchParams = Pick<Utility Module (Module1), 'name' | 'status'>
 * - export type Utility Module (Module1)UpdateData = Partial<Omit<Utility Module (Module1), 'id' | 'createdAt'>>
 */

export interface Module1 {
  usePos: (formId: string) => { x: number; y: number };
  savePos: (formId: string, x: number, y: number) => void;
  useControlVis: (controlId: string) => boolean;
  saveControlVis: (controlId: string, isVisible: boolean) => void;
  deleteRec: (tableName: string, id: number) => Promise<boolean>;
  getNextId: (tableName: string) => Promise<number>;
  checkIfExists: (tableName: string, fieldName: string, value: string | number) => Promise<boolean>;
  fillListView: (listViewId: string, data: any[]) => void;
  searchListView: (listViewId: string, query: string) => void;
  highlightFocus: (controlId: string) => void;
  showError: (message: string, title?: string) => void;
  isEmpty: (value: string | number | any[] | object) => boolean;
  createSettingsDir: () => Promise<void>;
  centerForm: (formId: string) => void;
}

export interface Module1FormData {
  formId: string;
  x?: number;
  y?: number;
  controlId?: string;
  isVisible?: boolean;
  tableName?: string;
  id?: number;
  fieldName?: string;
  value?: string | number;
  listViewId?: string;
  data?: any[];
  query?: string;
  message?: string;
  title?: string;
}