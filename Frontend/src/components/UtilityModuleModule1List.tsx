/**
 * 🏗️  DEVELOPMENT GUIDE - Utility Module (Module1) List Component
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
import { UtilityModule1Type } from '../types/UtilityModule1Types';

interface UtilityModule1ListProps {
  data: UtilityModule1Type[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UtilityModule1List: React.FC<UtilityModule1ListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: { original: UtilityModule1Type } }) => (
          <div>
            <button onClick={() => onEdit(row.original.id)}>Edit</button>
            <button onClick={() => onDelete(row.original.id)}>Delete</button>
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
              <th key={header.id}>
                {header.isPlaceholder ? null : header.renderHeader()}
              </th>
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

export default UtilityModule1List;