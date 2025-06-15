/**
 * 🏗️  DEVELOPMENT GUIDE - Reporting Module (Module3) Types
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
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Reporting Module (Module3)>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Reporting Module (Module3)Status { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Reporting Module (Module3)SearchParams = Pick<Reporting Module (Module3), 'name' | 'status'>
 * - export type Reporting Module (Module3)UpdateData = Partial<Omit<Reporting Module (Module3), 'id' | 'createdAt'>>
 */

export interface ReportingModule {
  schoolName: string;
  address: string;
  schoolYear: string;
  sectionName: string;
  studentRecords: StudentRecord[];
  classLists: ClassList[];
  populationStatistics: PopulationStatistic[];
  loginActivities: LoginActivity[];
  error?: Error;
}

export interface ReportingModuleFormData {
  formType: 'Form17' | 'Form20' | 'Form21' | 'Form25';
  studentData?: StudentRecord[];
  classData?: ClassList[];
  populationData?: PopulationStatistic[];
  loginData?: LoginActivity[];
  filters?: {
    dateRange?: {
      start: Date;
      end: Date;
    };
    gradeLevel?: string;
    section?: string;
  };
}

interface StudentRecord {
  id: string;
  name: string;
  gradeLevel: string;
  section: string;
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
}

interface ClassList {
  id: string;
  className: string;
  teacher: string;
  students: string[];
  schedule: string;
}

interface PopulationStatistic {
  gradeLevel: string;
  maleCount: number;
  femaleCount: number;
  total: number;
}

interface LoginActivity {
  userId: string;
  userName: string;
  role: string;
  loginTime: Date;
  logoutTime?: Date;
}

interface AttendanceRecord {
  date: Date;
  status: 'Present' | 'Absent' | 'Late';
}

interface GradeRecord {
  subject: string;
  quarter1: number;
  quarter2: number;
  quarter3: number;
  quarter4: number;
  finalGrade: number;
}