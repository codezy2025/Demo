/**
 * 🏗️  DEVELOPMENT GUIDE - Page Page Component
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
 * - Add URL-based filtering and search
 * - Implement breadcrumb navigation
 * - Add export/import functionality
 * - Include real-time updates (WebSocket/SSE)
 * - Add keyboard shortcuts for common actions
 * - Implement undo/redo functionality
 * 
 * 💡 State Management Improvements:
 * - Use useReducer for complex state logic
 * - Add optimistic updates for better UX
 * - Implement proper error boundaries
 * - Add loading skeletons instead of spinners
 * 
 * 🔧 User Experience:
 * - Add confirmation dialogs for destructive actions
 * - Implement toast notifications for feedback
 * - Add drag-and-drop for reordering
 * - Include accessibility features (ARIA labels)
 * 
 * 📱 Responsive Design:
 * - Add mobile-specific components
 * - Implement swipe actions for mobile
 * - Consider drawer/modal layouts for small screens
 */

export interface Page {
  width: number;
  height: number;
  isRunning: boolean;
  isMinimized: boolean;
  xInProgress: number;
  yInProgress: number;
  isPointerLocked: boolean;
  notificationPermission: NotificationPermission;
  worker: Worker | null;
  error: string | null;
}

export interface PageFormData {
  startButtonText: string;
  stopButtonText: string;
}