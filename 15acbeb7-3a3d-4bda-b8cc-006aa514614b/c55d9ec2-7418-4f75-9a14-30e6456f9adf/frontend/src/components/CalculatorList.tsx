/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator List Component
 * 
 * 📋 Original Requirements: Create a React TypeScript calculator component that replicates the functionality of the VB6 Form1.frm module. Include:
1. A display textbox (txtInput)
2. Digit buttons (0-9)
3. Decimal point button
4. Operator buttons (+, -, *, /)
5. Equals button (=)
6. Reset button
7. State management for operands and operations
8. Basic calculation logic
9. No error handling (matching original behavior)
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

import React, { useState } from 'react';
import { Calculator } from '../types/CalculatorTypes';

interface CalculatorListProps {
  data: Calculator[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CalculatorList: React.FC<CalculatorListProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Operation',
      accessorKey: 'operation',
    },
    {
      header: 'Result',
      accessorKey: 'result',
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: { original: Calculator } }) => (
        <div>
          <button onClick={() => onEdit(row.original.id)}>Edit</button>
          <button onClick={() => onDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={`${item.id}-${column.header}`}>
                {'accessorKey' in column
                  ? item[column.accessorKey as keyof Calculator]
                  : column.cell?.({ row: { original: item } })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalculatorList;