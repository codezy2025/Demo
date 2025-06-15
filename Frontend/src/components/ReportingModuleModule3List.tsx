/**
 * 🏗️  DEVELOPMENT GUIDE - Reporting Module (Module3) List Component
 * 
 * 📋 Original Requirements: Create a React TSX implementation of the Reporting Module with the following components:
1. A ReportHeader component that displays school name, address, school year, and section name
2. Report forms for student records, class lists, population statistics, and login activity
3. Data sources integration with student management and user management modules
4. Standardized report templates with consistent header information
5. Error handling for database issues and empty data

The implementation should include:
- Types/interfaces for report data structures
- Components for each report type (Form17, Form20, Form21, Form25)
- Data fetching services
- Report display components
- Error handling components
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
import { ReportData, StudentRecord, ClassList, PopulationStats, LoginActivity } from '../types/Reporting Module (Module3)Types';

interface ReportHeaderProps {
  schoolName: string;
  address: string;
  schoolYear: string;
  sectionName: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ schoolName, address, schoolYear, sectionName }) => {
  return (
    <div className="report-header">
      <h2>{schoolName}</h2>
      <p>{address}</p>
      <p>School Year: {schoolYear}</p>
      <p>Section: {sectionName}</p>
    </div>
  );
};

interface ReportTableProps<T extends object> {
  data: T[];
  columns: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReportTable = <T extends object>({ data, columns, onEdit, onDelete }: ReportTableProps<T>) => {
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => onEdit(row.original.id)}>Edit</button>
                <button onClick={() => onDelete(row.original.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface Form17Props {
  data: StudentRecord[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Form17: React.FC<Form17Props> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Student ID', accessor: 'studentId' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Grade', accessor: 'grade' },
      { Header: 'Section', accessor: 'section' },
    ],
    []
  );

  return <ReportTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />;
};

interface Form20Props {
  data: ClassList[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Form20: React.FC<Form20Props> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Class ID', accessor: 'classId' },
      { Header: 'Subject', accessor: 'subject' },
      { Header: 'Teacher', accessor: 'teacher' },
      { Header: 'Schedule', accessor: 'schedule' },
    ],
    []
  );

  return <ReportTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />;
};

interface Form21Props {
  data: PopulationStats[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Form21: React.FC<Form21Props> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Grade Level', accessor: 'gradeLevel' },
      { Header: 'Male Count', accessor: 'maleCount' },
      { Header: 'Female Count', accessor: 'femaleCount' },
      { Header: 'Total', accessor: 'total' },
    ],
    []
  );

  return <ReportTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />;
};

interface Form25Props {
  data: LoginActivity[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Form25: React.FC<Form25Props> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'User ID', accessor: 'userId' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Login Time', accessor: 'loginTime' },
      { Header: 'IP Address', accessor: 'ipAddress' },
    ],
    []
  );

  return <ReportTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />;
};

interface ErrorDisplayProps {
  error: Error | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  return <div className="error-message">Error: {error.message}</div>;
};

interface ReportingModuleProps {
  reportData: ReportData;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  error: Error | null;
}

const ReportingModule: React.FC<ReportingModuleProps> = ({ reportData, onEdit, onDelete, error }) => {
  return (
    <div className="reporting-module">
      <ReportHeader
        schoolName={reportData.schoolName}
        address={reportData.address}
        schoolYear={reportData.schoolYear}
        sectionName={reportData.sectionName}
      />
      <ErrorDisplay error={error} />
      
      <h3>Student Records (Form 17)</h3>
      <Form17 data={reportData.studentRecords} onEdit={onEdit} onDelete={onDelete} />
      
      <h3>Class Lists (Form 20)</h3>
      <Form20 data={reportData.classList} onEdit={onEdit} onDelete={onDelete} />
      
      <h3>Population Statistics (Form 21)</h3>
      <Form21 data={reportData.populationStats} onEdit={onEdit} onDelete={onDelete} />
      
      <h3>Login Activity (Form 25)</h3>
      <Form25 data={reportData.loginActivity} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default ReportingModule;