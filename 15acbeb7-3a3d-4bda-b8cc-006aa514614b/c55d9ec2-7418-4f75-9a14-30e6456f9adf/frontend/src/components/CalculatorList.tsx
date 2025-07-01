/**
 * 🏗️  DEVELOPMENT GUIDE - Calculator List Component
 * 
 * 📋 Original Requirements: Create a React TypeScript calculator component that mimics the VB6 Form1.frm functionality. Include:
1. A display TextBox equivalent (txtInput)
2. Buttons for digits 0-9 (Command1-Command10)
3. Decimal point button (Command11)
4. Operator buttons (+, -, *, /) (Command12-Command15)
5. Equals button (=) (Command16)
6. Reset button (Command17)
7. State management for operands (a, b), result (c), and current action
8. Basic calculation logic with the same behavior as the VB6 version
9. No error handling (matching original behavior)
10. Simple styling to make it look like a basic calculator
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
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
                {column.accessorKey
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