/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfigurationEditor Types
 * 
 * 📋 Original Requirements: Create a React TSX project configuration editor UI that allows users to view and edit settings similar to a VB6 .vbp file. Include: 1) A form with fields for Type (Exe), Startup Form, References, Version Info (Major/Minor/Revision), and Optimization flags. 2) A read-only display of the generated .vbp file content. 3) Buttons to save/load configurations.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<ProjectConfigurationEditor>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum ProjectConfigurationEditorStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type ProjectConfigurationEditorSearchParams = Pick<ProjectConfigurationEditor, 'name' | 'status'>
 * - export type ProjectConfigurationEditorUpdateData = Partial<Omit<ProjectConfigurationEditor, 'id' | 'createdAt'>>
 */

export interface ProjectConfigurationEditor {
  formData: ProjectConfigurationEditorFormData;
  vbpContent: string;
  onSave: () => void;
  onLoad: () => void;
}

export interface ProjectConfigurationEditorFormData {
  type: string;
  startupForm: string;
  references: string[];
  versionInfo: {
    major: number;
    minor: number;
    revision: number;
  };
  optimizationFlags: {
    optimizeForSpeed: boolean;
    optimizeForSize: boolean;
    disableOptimizations: boolean;
  };
}