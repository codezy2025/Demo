/**
 * 🏗️  DEVELOPMENT GUIDE - SystemOrchestrator Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<SystemOrchestrator> (for edit mode)
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
import { Button, TextField, Box, Grid, Paper, Typography } from '@mui/material';
import { SystemOrchestratorConfig } from '../types/SystemOrchestratorTypes';

interface SystemOrchestratorFormProps {
  onSubmit: SubmitHandler<SystemOrchestratorConfig>;
  defaultValues?: SystemOrchestratorConfig;
}

const SystemOrchestratorForm: React.FC<SystemOrchestratorFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SystemOrchestratorConfig>({
    defaultValues
  });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        System Orchestrator Configuration
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Database Host"
              variant="outlined"
              {...register('database.host', { required: 'Database host is required' })}
              error={!!errors.database?.host}
              helperText={errors.database?.host?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Database Port"
              variant="outlined"
              type="number"
              {...register('database.port', { required: 'Database port is required' })}
              error={!!errors.database?.port}
              helperText={errors.database?.port?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Database Name"
              variant="outlined"
              {...register('database.name', { required: 'Database name is required' })}
              error={!!errors.database?.name}
              helperText={errors.database?.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Database User"
              variant="outlined"
              {...register('database.user', { required: 'Database user is required' })}
              error={!!errors.database?.user}
              helperText={errors.database?.user?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Database Password"
              variant="outlined"
              type="password"
              {...register('database.password')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="LLM API Key"
              variant="outlined"
              type="password"
              {...register('llm.apiKey', { required: 'LLM API key is required' })}
              error={!!errors.llm?.apiKey}
              helperText={errors.llm?.apiKey?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="LLM Model"
              variant="outlined"
              {...register('llm.model', { required: 'LLM model is required' })}
              error={!!errors.llm?.model}
              helperText={errors.llm?.model?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Configuration
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SystemOrchestratorForm;