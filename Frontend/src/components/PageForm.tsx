/**
 * 🏗️  DEVELOPMENT GUIDE - Page Form Component
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
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Page> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PageFormData } from '../types/PageTypes';

interface PageFormProps {
  onSubmit: (data: PageFormData) => void;
}

const PageForm: React.FC<PageFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PageFormData>();
  const [isRunning, setIsRunning] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const [xInProgress, setXInProgress] = useState(0);
  const [yInProgress, setYInProgress] = useState(0);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/mouseWorker.ts', import.meta.url));
    workerRef.current.onmessage = (event) => {
      const { x, y } = event.data;
      setXInProgress(x);
      setYInProgress(y);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleStart = () => {
    if (!document.pointerLockElement) {
      document.body.requestPointerLock().catch((error) => {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Error', { body: `Pointer lock failed: ${error.message}` });
          }
        });
      });
    }
    setIsRunning(true);
    workerRef.current?.postMessage({ command: 'start' });
  };

  const handleStop = () => {
    setIsRunning(false);
    workerRef.current?.postMessage({ command: 'stop' });
    document.exitPointerLock();
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleExit = () => {
    workerRef.current?.postMessage({ command: 'exit' });
    window.close();
  };

  return (
    <div style={{ width: '450px', height: '300px' }}>
      {!isMinimized && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <button
              type="button"
              onClick={isRunning ? handleStop : handleStart}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button
              type="button"
              onClick={handleMinimize}
            >
              {isMinimized ? 'Show' : 'Hide'}
            </button>
            <button
              type="button"
              onClick={handleExit}
            >
              Exit
            </button>
          </div>
          <div>
            <span>X: {xInProgress}</span>
            <span>Y: {yInProgress}</span>
          </div>
        </form>
      )}
      {isMinimized && (
        <button onClick={handleMinimize}>Show</button>
      )}
    </div>
  );
};

export default PageForm;