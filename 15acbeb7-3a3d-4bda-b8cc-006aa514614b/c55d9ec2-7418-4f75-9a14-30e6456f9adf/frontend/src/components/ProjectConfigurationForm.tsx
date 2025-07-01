/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfiguration Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<ProjectConfiguration> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProjectConfiguration, Reference, BuildConfiguration } from '../types/ProjectConfigurationTypes';

interface ProjectConfigurationFormProps {
  onSubmit: SubmitHandler<ProjectConfiguration>;
  initialData?: ProjectConfiguration;
}

const ProjectConfigurationForm: React.FC<ProjectConfigurationFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<ProjectConfiguration>({
    defaultValues: initialData || {
      name: '',
      version: '1.0.0',
      optimizationFlags: [],
      references: [],
      startupObject: '',
      buildConfiguration: 'Debug'
    }
  });

  const [references, setReferences] = React.useState<Reference[]>(initialData?.references || []);
  const [newReference, setNewReference] = React.useState<Omit<Reference, 'id'>>({ name: '', path: '' });

  const addReference = () => {
    if (newReference.name && newReference.path) {
      setReferences([...references, { ...newReference, id: Date.now().toString() }]);
      setNewReference({ name: '', path: '' });
    }
  };

  const removeReference = (id: string) => {
    setReferences(references.filter(ref => ref.id !== id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="project-config-form">
      <div className="form-section">
        <h2>Project Settings</h2>
        <div className="form-group">
          <label>Project Name</label>
          <input {...register('name', { required: true })} />
          {errors.name && <span className="error">Project name is required</span>}
        </div>

        <div className="form-group">
          <label>Version</label>
          <input {...register('version', { required: true })} />
          {errors.version && <span className="error">Version is required</span>}
        </div>

        <div className="form-group">
          <label>Optimization Flags</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" {...register('optimizationFlags')} value="RemoveArrayBoundsChecks" />
              Remove Array Bounds Checks
            </label>
            <label>
              <input type="checkbox" {...register('optimizationFlags')} value="IntegerOverflowChecks" />
              Integer Overflow Checks
            </label>
            <label>
              <input type="checkbox" {...register('optimizationFlags')} value="FavorPentiumPro" />
              Favor Pentium Pro
            </label>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>References</h2>
        <div className="reference-manager">
          <div className="add-reference">
            <input
              type="text"
              placeholder="Reference Name"
              value={newReference.name}
              onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Path"
              value={newReference.path}
              onChange={(e) => setNewReference({ ...newReference, path: e.target.value })}
            />
            <button type="button" onClick={addReference}>Add</button>
          </div>

          <div className="reference-list">
            {references.map((ref) => (
              <div key={ref.id} className="reference-item">
                <span>{ref.name} ({ref.path})</span>
                <button type="button" onClick={() => removeReference(ref.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Startup Object</h2>
        <div className="form-group">
          <select {...register('startupObject', { required: true })}>
            <option value="">Select startup object</option>
            <option value="Form1.frm">Form1.frm</option>
            <option value="Main.bas">Main.bas</option>
          </select>
          {errors.startupObject && <span className="error">Startup object is required</span>}
        </div>
      </div>

      <div className="form-section">
        <h2>Build Configuration</h2>
        <div className="form-group">
          <select {...register('buildConfiguration', { required: true })}>
            <option value="Debug">Debug</option>
            <option value="Release">Release</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">Save Configuration</button>
      </div>
    </form>
  );
};

export default ProjectConfigurationForm;