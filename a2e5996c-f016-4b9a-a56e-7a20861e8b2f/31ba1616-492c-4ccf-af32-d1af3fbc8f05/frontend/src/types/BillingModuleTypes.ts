/**
 * 🏗️  DEVELOPMENT GUIDE - Billing Module Types
 * 
 * 📋 Original Requirements: Generate React TSX files for: 1) CartPage component with item management and tax calculation, 2) BillsPage component for displaying invoice history, 3) BillingService for API calls, and 4) TypeScript interfaces matching the Mongoose schema
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Billing Module>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Billing ModuleStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Billing ModuleSearchParams = Pick<Billing Module, 'name' | 'status'>
 * - export type Billing ModuleUpdateData = Partial<Omit<Billing Module, 'id' | 'createdAt'>>
 */

export interface BillingModule {
  id: string;
  invoiceNumber: string;
  customerId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingModuleFormData {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentStatus: 'pending' | 'paid' | 'failed';
}