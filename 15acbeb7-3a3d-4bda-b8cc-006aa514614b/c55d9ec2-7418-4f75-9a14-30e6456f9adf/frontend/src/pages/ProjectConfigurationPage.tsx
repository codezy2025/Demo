/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfiguration Page Component
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
import ProjectConfigurationForm from '../components/ProjectConfigurationForm';
import ProjectConfigurationList from '../components/ProjectConfigurationList';
import projectConfigurationService from '../services/projectConfigurationService';
import { ProjectConfiguration } from '../types/ProjectConfigurationTypes';

const ProjectConfigurationPage: React.FC = () => {
  const [configurations, setConfigurations] = useState<ProjectConfiguration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<ProjectConfiguration | null>(null);

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const data = await projectConfigurationService.getAll();
      setConfigurations(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (configuration: ProjectConfiguration) => {
    try {
      await projectConfigurationService.create(configuration);
      await fetchConfigurations();
    } catch (err) {
      setError('Failed to create configuration');
    }
  };

  const handleUpdate = async (configuration: ProjectConfiguration) => {
    try {
      await projectConfigurationService.update(configuration.id, configuration);
      await fetchConfigurations();
      setSelectedConfiguration(null);
    } catch (err) {
      setError('Failed to update configuration');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectConfigurationService.delete(id);
      await fetchConfigurations();
    } catch (err) {
      setError('Failed to delete configuration');
    }
  };

  const handleSelect = (configuration: ProjectConfiguration) => {
    setSelectedConfiguration(configuration);
  };

  const handleCancel = () => {
    setSelectedConfiguration(null);
  };

  return (
    <div>
      <h1>Project Configurations</h1>
      {error && <div className="error">{error}</div>}
      <ProjectConfigurationForm
        onSubmit={selectedConfiguration ? handleUpdate : handleCreate}
        onCancel={handleCancel}
        initialValues={selectedConfiguration}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProjectConfigurationList
          configurations={configurations}
          onEdit={handleSelect}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProjectConfigurationPage;