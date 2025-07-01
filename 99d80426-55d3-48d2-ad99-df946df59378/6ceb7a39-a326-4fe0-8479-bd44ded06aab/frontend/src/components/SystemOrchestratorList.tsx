/**
 * 🏗️  DEVELOPMENT GUIDE - SystemOrchestrator List Component
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
 * - Add search/filter functionality
 * - Implement sorting for all columns
 * - Add bulk operations (delete, update status)
 * - Include export functionality (CSV, PDF)
 * - Add infinite scrolling or virtual scrolling
 * - Implement row selection with checkboxes
 * 
 * 💡 Props to Consider Adding:
 * - searchTerm?: string
 * - filters?: Record<string, any>
 * - sortConfig?: { key: string, direction: 'asc' | 'desc' }
 * - isLoading?: boolean
 * - onBulkAction?: (action: string, ids: string[]) => void
 * 
 * 🔧 Libraries to Consider:
 * - @tanstack/react-table for advanced features
 * - react-window for virtualization
 * - fuse.js for fuzzy search
 */

import React from 'react';
import { SystemOrchestrator } from '../types/SystemOrchestratorTypes';

interface SystemOrchestratorListProps {
  data: SystemOrchestrator[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SystemOrchestratorList: React.FC<SystemOrchestratorListProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>
              <button onClick={() => onEdit(item.id)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SystemOrchestratorList;