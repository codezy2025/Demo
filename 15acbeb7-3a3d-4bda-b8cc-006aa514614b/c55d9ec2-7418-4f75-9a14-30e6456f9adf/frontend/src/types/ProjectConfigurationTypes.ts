/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfiguration Types
 * 
 * 📋 Original Requirements: Create a React/TypeScript project configuration module that replicates the key functionality of a VB6 .vbp file in a modern web interface. Include:
1. A form to edit project settings (name, version, optimization flags)
2. A reference manager for dependencies (like stdole2.tlb)
3. Startup object selection (like Form1.frm)
4. Build configuration options
5. Visual representation of dependencies
6. Save/load functionality for configurations
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<ProjectConfiguration>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum ProjectConfigurationStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type ProjectConfigurationSearchParams = Pick<ProjectConfiguration, 'name' | 'status'>
 * - export type ProjectConfigurationUpdateData = Partial<Omit<ProjectConfiguration, 'id' | 'createdAt'>>
 */

export interface ProjectConfiguration {
  name: string;
  version: string;
  optimizationFlags: string[];
  references: Reference[];
  startupObject: string;
  buildConfigurations: BuildConfiguration[];
  dependencies: Dependency[];
}

export interface ProjectConfigurationFormData {
  name: string;
  version: string;
  optimizationFlags: string[];
  selectedReference: string;
  startupObject: string;
  activeBuildConfiguration: string;
}

interface Reference {
  id: string;
  name: string;
  path: string;
  version: string;
}

interface BuildConfiguration {
  id: string;
  name: string;
  compilerOptions: string[];
  outputPath: string;
}

interface Dependency {
  id: string;
  name: string;
  version: string;
  dependencies: string[];
}