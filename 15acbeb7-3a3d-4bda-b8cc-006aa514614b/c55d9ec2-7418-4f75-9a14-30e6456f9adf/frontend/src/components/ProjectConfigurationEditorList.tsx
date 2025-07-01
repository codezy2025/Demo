/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfigurationEditor List Component
 * 
 * 📋 Original Requirements: Create a React TSX project configuration editor UI that allows users to view and edit settings similar to a VB6 .vbp file. Include: 1) A form with fields for Type (Exe), Startup Form, References, Version Info (Major/Minor/Revision), and Optimization flags. 2) A read-only display of the generated .vbp file content. 3) Buttons to save/load configurations.
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
import { useTable } from '@tanstack/react-table';
import { ProjectConfiguration, ProjectConfigurationEditorProps } from '../types/ProjectConfigurationEditorTypes';

const ProjectConfigurationEditorList: React.FC<ProjectConfigurationEditorProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Startup Form',
        accessorKey: 'startupForm',
      },
      {
        header: 'References',
        accessorKey: 'references',
        cell: (info: any) => info.getValue().join(', '),
      },
      {
        header: 'Version',
        accessorKey: 'versionInfo',
        cell: (info: any) => `${info.getValue().major}.${info.getValue().minor}.${info.getValue().revision}`,
      },
      {
        header: 'Optimization',
        accessorKey: 'optimizationFlags',
        cell: (info: any) => info.getValue().join(', '),
      },
      {
        header: 'Actions',
        cell: (info: any) => (
          <div>
            <button onClick={() => onEdit(info.row.original)}>Edit</button>
            <button onClick={() => onDelete(info.row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useTable({
    data,
    columns,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.renderHeader()}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectConfigurationEditorList;