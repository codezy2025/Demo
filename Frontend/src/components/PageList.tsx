/**
 * 🏗️  DEVELOPMENT GUIDE - Page List Component
 * 
 * 📋 Original Requirements: Create AutoMouseMoverPage.tsx with:
- Dimensions: 450x300px
- Start/Hide button that begins mouse movement and minimizes UI
- Stop/Exit button that terminates the app
- State management for xInProgress/yInProgress
- Pointer Lock API for mouse movement
- Browser notifications for system tray simulation
- Web Worker for background processing
- Clean TypeScript typing
- Error handling for permissions
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

import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types/PageTypes';

interface PageListProps {
  data: Page[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PageList: React.FC<PageListProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: { original: Page } }) => (
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
        {data.map((page) => (
          <tr key={page.id}>
            {columns.map((column) => (
              <td key={`${page.id}-${column.header}`}>
                {column.accessorKey
                  ? page[column.accessorKey as keyof Page]
                  : column.cell?.({ row: { original: page } })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PageList;