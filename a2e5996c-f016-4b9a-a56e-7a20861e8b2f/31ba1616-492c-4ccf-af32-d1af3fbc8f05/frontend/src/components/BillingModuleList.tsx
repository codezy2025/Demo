/**
 * 🏗️  DEVELOPMENT GUIDE - Billing Module List Component
 * 
 * 📋 Original Requirements: Generate React TSX files for: 1) CartPage component with item management and tax calculation, 2) BillsPage component for displaying invoice history, 3) BillingService for API calls, and 4) TypeScript interfaces matching the Mongoose schema
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
import { BillingModule, BillingModuleTypes } from '../types/BillingModuleTypes';

interface BillingModuleListProps {
  data: BillingModule[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BillingModuleList: React.FC<BillingModuleListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Tax',
        accessor: 'tax',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: { original: BillingModule } }) => (
          <div>
            <button onClick={() => onEdit(row.original._id)}>Edit</button>
            <button onClick={() => onDelete(row.original._id)}>Delete</button>
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

export default BillingModuleList;