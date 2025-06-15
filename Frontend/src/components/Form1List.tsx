/**
 * 🏗️  DEVELOPMENT GUIDE - Form1 Form Component
 * 
 * 📋 Original Requirements: Create a React TypeScript implementation of the student management form with the following features:
1. A data table displaying student records with columns: Student Number, Last Name, First Name, Middle Name, Gender, Status, School Year, Level/Grade, Section
2. Action buttons for: Add Student, Edit Student, Delete Student, Assign Section, Print Student List, Print Registration Slip, Advanced Search, Filter Options, Reload Data
3. Status bar showing record count
4. Integration with other forms (modal dialogs) for add/edit, section assignment, search and filtering
5. All the database operations described in the documentation
6. Proper TypeScript interfaces for student data
7. React hooks for state management
8. Error handling and user confirmation dialogs
 * 
 * 🚀 Enhancement Ideas:
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Form1> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useTable } from 'react-table';
import { Form1Student } from '../types/Form1Types';

interface Form1ListProps {
  data: Form1Student[];
  onEdit: (student: Form1Student) => void;
  onDelete: (studentId: string) => void;
}

const Form1List: React.FC<Form1ListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Student Number',
        accessor: 'studentNumber',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Middle Name',
        accessor: 'middleName',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'School Year',
        accessor: 'schoolYear',
      },
      {
        Header: 'Level/Grade',
        accessor: 'gradeLevel',
      },
      {
        Header: 'Section',
        accessor: 'section',
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: { original: Form1Student } }) => (
          <div>
            <button onClick={() => onEdit(row.original)}>Edit</button>
            <button onClick={() => onDelete(row.original.studentNumber)}>Delete</button>
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
    <div>
      <div>
        <button>Add Student</button>
        <button>Assign Section</button>
        <button>Print Student List</button>
        <button>Print Registration Slip</button>
        <button>Advanced Search</button>
        <button>Filter Options</button>
        <button>Reload Data</button>
      </div>

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
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <p>Total Records: {data.length}</p>
      </div>
    </div>
  );
};

export default Form1List;