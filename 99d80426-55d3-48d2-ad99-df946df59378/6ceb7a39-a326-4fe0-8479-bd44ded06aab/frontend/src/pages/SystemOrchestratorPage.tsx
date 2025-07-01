/**
 * 🏗️  DEVELOPMENT GUIDE - SystemOrchestrator Page Component
 * 
 * 📋 Original Requirements: Generate React TSX files for a frontend interface to the SystemOrchestrator module. The interface should include:
1. QueryForm.tsx - A form for entering natural language queries with session management
2. ResultsDisplay.tsx - A component to display SQL results in table format with explanation
3. StatusPanel.tsx - For showing execution status, errors, and performance metrics
4. ConfigEditor.tsx - A configuration interface matching the YAML structure
5. types.ts - TypeScript interfaces matching QueryRequest and QueryResponse from the backend

Key requirements:
- Use Material-UI components
- Support dark/light theme
- Type-safe props for all components
- Error boundaries around query execution
- Responsive layout for analytics dashboard use
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
import SystemOrchestratorForm from '../components/SystemOrchestratorForm';
import SystemOrchestratorList from '../components/SystemOrchestratorList';
import systemOrchestratorService from '../services/systemOrchestratorService';
import { SystemOrchestrator, SystemOrchestratorFormData } from '../types/SystemOrchestratorTypes';

const SystemOrchestratorPage: React.FC = () => {
  const [systems, setSystems] = useState<SystemOrchestrator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<SystemOrchestrator | null>(null);

  useEffect(() => {
    fetchSystems();
  }, []);

  const fetchSystems = async () => {
    try {
      setLoading(true);
      const data = await systemOrchestratorService.getAll();
      setSystems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch systems');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: SystemOrchestratorFormData) => {
    try {
      setLoading(true);
      const newSystem = await systemOrchestratorService.create(formData);
      setSystems([...systems, newSystem]);
      setError(null);
    } catch (err) {
      setError('Failed to create system');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: SystemOrchestratorFormData) => {
    try {
      setLoading(true);
      const updatedSystem = await systemOrchestratorService.update(id, formData);
      setSystems(systems.map(sys => sys.id === id ? updatedSystem : sys));
      setSelectedSystem(null);
      setError(null);
    } catch (err) {
      setError('Failed to update system');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await systemOrchestratorService.delete(id);
      setSystems(systems.filter(sys => sys.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete system');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>System Orchestrator</h1>
      {error && <div className="error">{error}</div>}
      <SystemOrchestratorForm
        onSubmit={selectedSystem ? (data) => handleUpdate(selectedSystem.id, data) : handleCreate}
        initialData={selectedSystem}
        onCancel={() => setSelectedSystem(null)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SystemOrchestratorList
          systems={systems}
          onEdit={setSelectedSystem}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SystemOrchestratorPage;