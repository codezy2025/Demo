/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfiguration List Component
 * 
 * 📋 Original Requirements: Create a React/TypeScript project configuration module that replicates the key functionality of a VB6 .vbp file in a modern web interface. Include:
1. A form to edit project settings (name, version, optimization flags)
2. A reference manager for dependencies (like stdole2.tlb)
3. Startup object selection (like Form1.frm)
4. Build configuration options
5. Visual representation of dependencies
6. Save/load functionality for configurations
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
import { ProjectConfiguration } from '../types/ProjectConfigurationTypes';

interface ProjectConfigurationListProps {
  data: ProjectConfiguration[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectConfigurationList: React.FC<ProjectConfigurationListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Version',
        accessor: 'version',
      },
      {
        Header: 'Optimization',
        accessor: 'optimizationFlags',
      },
      {
        Header: 'Startup Object',
        accessor: 'startupObject',
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: any }) => (
          <div>
            <button onClick={() => onEdit(row.original.id)}>Edit</button>
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
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                {column.render('Header')}
              </th>
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
                <td {...cell.getCellProps()} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProjectConfigurationList;