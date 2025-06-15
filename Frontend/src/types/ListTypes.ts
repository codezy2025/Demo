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

export interface List {
  id: string;
  notifications: Notification[];
  movementHistory: MovementEvent[];
  lastUpdated: Date;
  isRestorable: boolean;
  notificationTypes: NotificationType[];
}

export interface ListFormData {
  notificationTitle: string;
  notificationMessage: string;
  notificationType: NotificationType;
  restorePoint?: MovementEvent;
  cleanUI: boolean;
  responsiveSettings: ResponsiveSettings;
}