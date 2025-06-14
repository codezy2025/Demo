/**
 * 🏗️  DEVELOPMENT GUIDE - Reporting Module (Module3) Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Reporting Module (Module3)[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Reporting Module (Module3)Stats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { 
    Report, 
    ReportCreateRequest, 
    ReportUpdateRequest 
} from '../types/Reporting Module (Module3)Types';

const API_BASE_URL = 'http://localhost:3000/api/reports';

const getAll = async (): Promise<Report[]> => {
    const response = await axios.get<Report[]>(API_BASE_URL);
    return response.data;
};

const create = async (reportData: ReportCreateRequest): Promise<Report> => {
    const response = await axios.post<Report>(API_BASE_URL, reportData);
    return response.data;
};

const update = async (id: string, reportData: ReportUpdateRequest): Promise<Report> => {
    const response = await axios.put<Report>(`${API_BASE_URL}/${id}`, reportData);
    return response.data;
};

const deleteReport = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const reportingModule3Service = {
    getAll,
    create,
    update,
    delete: deleteReport
};