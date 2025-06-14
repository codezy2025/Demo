/**
 * 🏗️  DEVELOPMENT GUIDE - Module2Service List Component
 * 
 * 📋 Original Requirements: Create a TypeScript service module that provides frontend equivalents to the Module2 database functionality. This should be an API service layer that would communicate with a backend that handles the actual database operations.

Key Features to Implement:
1. Database connection management (abstracted as API configuration)
2. Recordset operations (as API calls returning data)
3. User activity tracking (login/logout API calls)
4. Global state management (using React context instead of global variables)

Include proper TypeScript interfaces for all data types and API responses.
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
import { useTable } from 'react-table';
import { Module2Service } from '../types/Module2ServiceTypes';

interface Module2ServiceListProps {
  data: Module2Service[];
  onEdit: (service: Module2Service) => void;
  onDelete: (id: string) => void;
}

const Module2ServiceList: React.FC<Module2ServiceListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: { original: Module2Service } }) => (
          <div>
            <button onClick={() => onEdit(row.original)}>Edit</button>
            <button onClick={() => onDelete(row.original.id)}>Delete</button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Module2ServiceList;