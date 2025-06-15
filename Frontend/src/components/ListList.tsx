/**
 * 🏗️  DEVELOPMENT GUIDE - List List Component
 * 
 * 📋 Original Requirements: Create NotificationList.tsx with:
1. System notification display
2. Movement history tracking
3. Restore functionality
4. Clean UI matching the Java version's tray menu
5. TypeScript typing for all props
6. Responsive design for different notification types
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
import { ListItem } from '../types/ListTypes';

interface ListListProps {
  data: ListItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListList: React.FC<ListListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'System Notification',
        accessorKey: 'notification',
        cell: (info: any) => (
          <div className="notification-display">
            {info.getValue()}
          </div>
        ),
      },
      {
        header: 'Movement History',
        accessorKey: 'movement',
        cell: (info: any) => (
          <div className="movement-history">
            {info.getValue()}
          </div>
        ),
      },
      {
        header: 'Actions',
        accessorKey: 'id',
        cell: (info: any) => (
          <div className="actions">
            <button onClick={() => onEdit(info.getValue())}>Edit</button>
            <button onClick={() => onDelete(info.getValue())}>Delete</button>
            <button onClick={() => console.log('Restore', info.getValue())}>
              Restore
            </button>
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
    <div className="list-list-container">
      <table className="notification-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header as React.ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.renderCell() as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListList;