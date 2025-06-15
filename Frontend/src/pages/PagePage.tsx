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

import React, { useState, useEffect } from 'react';
import PageForm from '../components/PageForm';
import PageList from '../components/PageList';
import pageService from '../services/pageService';
import { Page } from '../types/PageTypes';

const PagePage: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await pageService.getAll();
      setPages(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (page: Omit<Page, 'id'>) => {
    try {
      setLoading(true);
      const newPage = await pageService.create(page);
      setPages([...pages, newPage]);
      setError(null);
    } catch (err) {
      setError('Failed to create page');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, page: Omit<Page, 'id'>) => {
    try {
      setLoading(true);
      const updatedPage = await pageService.update(id, page);
      setPages(pages.map(p => p.id === id ? updatedPage : p));
      setCurrentPage(null);
      setError(null);
    } catch (err) {
      setError('Failed to update page');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await pageService.delete(id);
      setPages(pages.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete page');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setCurrentPage(page);
  };

  const handleCancel = () => {
    setCurrentPage(null);
  };

  return (
    <div>
      <h1>Pages</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      
      <PageForm 
        onSubmit={currentPage ? (page) => handleUpdate(currentPage.id, page) : handleCreate}
        onCancel={currentPage ? handleCancel : undefined}
        initialValues={currentPage || undefined}
      />
      
      <PageList 
        pages={pages} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default PagePage;