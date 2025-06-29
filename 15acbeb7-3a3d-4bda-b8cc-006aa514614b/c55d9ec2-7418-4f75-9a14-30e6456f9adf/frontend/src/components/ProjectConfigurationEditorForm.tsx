/**
 * 🏗️  DEVELOPMENT GUIDE - ProjectConfigurationEditor Form Component
 * 
 * 📋 Original Requirements: Create a React TSX project configuration editor UI that allows users to view and edit settings similar to a VB6 .vbp file. Include: 1) A form with fields for Type (Exe), Startup Form, References, Version Info (Major/Minor/Revision), and Optimization flags. 2) A read-only display of the generated .vbp file content. 3) Buttons to save/load configurations.
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
 * - initialData?: Partial<ProjectConfigurationEditor> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ProjectConfiguration, ProjectConfigurationEditorProps } from '../types/ProjectConfigurationEditorTypes';

const ProjectConfigurationEditorForm: React.FC<ProjectConfigurationEditorProps> = ({ onSubmit }) => {
  const { control, handleSubmit, watch } = useForm<ProjectConfiguration>({
    defaultValues: {
      type: 'Exe',
      startupForm: '',
      references: [],
      versionInfo: {
        major: 1,
        minor: 0,
        revision: 0
      },
      optimizationFlags: {
        optimizeForSpeed: false,
        favorPentiumPro: false,
        createSymbolicDebugInfo: false
      }
    }
  });

  const formValues = watch();

  const generateVBPContent = (config: ProjectConfiguration): string => {
    return `[Project]
Type=${config.type}
StartupForm=${config.startupForm}
References=${config.references.join(',')}
MajorVer=${config.versionInfo.major}
MinorVer=${config.versionInfo.minor}
RevisionVer=${config.versionInfo.revision}
OptimizeForSpeed=${config.optimizationFlags.optimizeForSpeed ? 1 : 0}
FavorPentiumPro=${config.optimizationFlags.favorPentiumPro ? 1 : 0}
CreateSymbolicDebugInfo=${config.optimizationFlags.createSymbolicDebugInfo ? 1 : 0}`;
  };

  return (
    <div className="project-configuration-editor">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Type</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="Exe">Exe</option>
                <option value="Dll">Dll</option>
                <option value="Ocx">Ocx</option>
              </select>
            )}
          />
        </div>

        <div className="form-group">
          <label>Startup Form</label>
          <Controller
            name="startupForm"
            control={control}
            render={({ field }) => <input type="text" {...field} />}
          />
        </div>

        <div className="form-group">
          <label>References</label>
          <Controller
            name="references"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                onChange={(e) => field.onChange(e.target.value.split(','))}
                value={field.value.join(',')}
              />
            )}
          />
        </div>

        <div className="form-group">
          <label>Version Info</label>
          <div className="version-fields">
            <Controller
              name="versionInfo.major"
              control={control}
              render={({ field }) => (
                <input type="number" min="0" {...field} />
              )}
            />
            <Controller
              name="versionInfo.minor"
              control={control}
              render={({ field }) => (
                <input type="number" min="0" {...field} />
              )}
            />
            <Controller
              name="versionInfo.revision"
              control={control}
              render={({ field }) => (
                <input type="number" min="0" {...field} />
              )}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Optimization Flags</label>
          <div className="checkbox-group">
            <Controller
              name="optimizationFlags.optimizeForSpeed"
              control={control}
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Optimize for Speed
                </label>
              )}
            />
            <Controller
              name="optimizationFlags.favorPentiumPro"
              control={control}
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Favor Pentium Pro
                </label>
              )}
            />
            <Controller
              name="optimizationFlags.createSymbolicDebugInfo"
              control={control}
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Create Symbolic Debug Info
                </label>
              )}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button">Load</button>
        </div>
      </form>

      <div className="vbp-preview">
        <h3>Generated .vbp File</h3>
        <pre>{generateVBPContent(formValues)}</pre>
      </div>
    </div>
  );
};

export default ProjectConfigurationEditorForm;