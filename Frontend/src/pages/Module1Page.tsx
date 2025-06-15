/**
 * 🏗️  DEVELOPMENT GUIDE - Module1 Page Component
 * 
 * 📋 Original Requirements: Convert the VB6 Module1 utilities to React TypeScript components and hooks. Create separate files for form utilities, list utilities, validation utilities, and database utilities. Use modern React patterns like hooks and context for state management. Include TypeScript interfaces for all function parameters and return types.
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
import Module1Form from '../components/Module1Form';
import Module1List from '../components/Module1List';
import module1Service from '../services/module1Service';
import { Module1Item, Module1FormData } from '../types/Module1Types';

const Module1Page: React.FC = () => {
  const [items, setItems] = useState<Module1Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Module1Item | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await module1Service.getAll();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (formData: Module1FormData) => {
    try {
      setLoading(true);
      const newItem = await module1Service.create(formData);
      setItems([...items, newItem]);
      setError(null);
    } catch (err) {
      setError('Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: Module1FormData) => {
    try {
      setLoading(true);
      const updatedItem = await module1Service.update(id, formData);
      setItems(items.map(item => item.id === id ? updatedItem : item));
      setEditingItem(null);
      setError(null);
    } catch (err) {
      setError('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await module1Service.delete(id);
      setItems(items.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Module1Item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <h1>Module 1</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      
      <Module1Form 
        onSubmit={editingItem ? (data) => handleUpdate(editingItem.id, data) : handleCreate}
        onCancel={editingItem ? handleCancelEdit : undefined}
        initialData={editingItem}
      />
      
      <Module1List 
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Module1Page;