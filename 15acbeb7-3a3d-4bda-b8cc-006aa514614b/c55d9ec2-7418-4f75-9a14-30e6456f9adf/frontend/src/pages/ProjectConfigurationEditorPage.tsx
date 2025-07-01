/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfigurationEditor Page Component
 * 
 * 📋 Original Requirements: Create a React TSX project configuration editor UI that allows users to view and edit settings similar to a VB6 .vbp file. Include: 1) A form with fields for Type (Exe), Startup Form, References, Version Info (Major/Minor/Revision), and Optimization flags. 2) A read-only display of the generated .vbp file content. 3) Buttons to save/load configurations.
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
import ProjectConfigurationEditorForm from '../components/ProjectConfigurationEditorForm';
import ProjectConfigurationEditorList from '../components/ProjectConfigurationEditorList';
import projectConfigurationEditorService from '../services/projectConfigurationEditorService';
import { ProjectConfiguration } from '../types/ProjectConfigurationEditorTypes';

const ProjectConfigurationEditorPage: React.FC = () => {
    const [configurations, setConfigurations] = useState<ProjectConfiguration[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingConfiguration, setEditingConfiguration] = useState<ProjectConfiguration | null>(null);

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        try {
            setLoading(true);
            const data = await projectConfigurationEditorService.getAll();
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
            await projectConfigurationEditorService.create(configuration);
            await fetchConfigurations();
        } catch (err) {
            setError('Failed to create configuration');
        }
    };

    const handleUpdate = async (configuration: ProjectConfiguration) => {
        try {
            await projectConfigurationEditorService.update(configuration);
            await fetchConfigurations();
            setEditingConfiguration(null);
        } catch (err) {
            setError('Failed to update configuration');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await projectConfigurationEditorService.delete(id);
            await fetchConfigurations();
        } catch (err) {
            setError('Failed to delete configuration');
        }
    };

    const handleEdit = (configuration: ProjectConfiguration) => {
        setEditingConfiguration(configuration);
    };

    const handleCancel = () => {
        setEditingConfiguration(null);
    };

    return (
        <div>
            <h1>Project Configuration Editor</h1>
            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <ProjectConfigurationEditorForm
                        onSubmit={editingConfiguration ? handleUpdate : handleCreate}
                        onCancel={handleCancel}
                        initialData={editingConfiguration}
                    />
                    <ProjectConfigurationEditorList
                        configurations={configurations}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            )}
        </div>
    );
};

export default ProjectConfigurationEditorPage;