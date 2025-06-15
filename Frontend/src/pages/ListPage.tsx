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

import React, { useState, useEffect } from 'react';
import ListForm from '../components/ListForm';
import ListList from '../components/ListList';
import listService from '../services/listService';
import { ListItem } from '../types/ListTypes';

const ListPage: React.FC = () => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await listService.getAll();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (item: Omit<ListItem, 'id'>) => {
    try {
      const newItem = await listService.create(item);
      setItems([...items, newItem]);
    } catch (err) {
      setError('Failed to create item');
    }
  };

  const handleUpdate = async (id: string, item: Omit<ListItem, 'id'>) => {
    try {
      const updatedItem = await listService.update(id, item);
      setItems(items.map(i => i.id === id ? updatedItem : i));
      setEditingItem(null);
    } catch (err) {
      setError('Failed to update item');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await listService.delete(id);
      setItems(items.filter(i => i.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const handleEdit = (item: ListItem) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <h1>List Management</h1>
      {error && <div className="error">{error}</div>}
      <ListForm 
        onSubmit={editingItem ? (item) => handleUpdate(editingItem.id, item) : handleCreate}
        onCancel={editingItem ? handleCancelEdit : undefined}
        initialValues={editingItem}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ListList 
          items={items} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default ListPage;