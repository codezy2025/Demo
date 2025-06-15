/**
 * 🏗️  DEVELOPMENT GUIDE - Service Form Component
 * 
 * 📋 Original Requirements: Create mouseMovementService.ts with:
1. Pointer Lock API implementation
2. Random coordinate generation
3. Movement interval control (default 5s)
4. Web Worker communication
5. Proper error handling for permissions
6. TypeScript interfaces for all methods
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
 * - initialData?: Partial<Service> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ServiceFormData, MouseMovementServiceConfig } from '../types/ServiceTypes';

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ServiceFormData>();
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const movementInterval = watch('movementInterval', 5000);

  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      cleanupWorker();
      cleanupInterval();
    };
  }, []);

  const cleanupWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  const cleanupInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePointerLock = async () => {
    try {
      await document.body.requestPointerLock();
    } catch (error) {
      console.error('Pointer Lock Error:', error);
    }
  };

  const startService = (config: MouseMovementServiceConfig) => {
    cleanupWorker();
    cleanupInterval();

    workerRef.current = new Worker(new URL('../workers/mouseMovementWorker.ts', import.meta.url));
    workerRef.current.postMessage({ type: 'START', config });

    intervalRef.current = setInterval(() => {
      workerRef.current?.postMessage({ type: 'MOVE' });
    }, config.movementInterval);
  };

  const stopService = () => {
    workerRef.current?.postMessage({ type: 'STOP' });
    cleanupWorker();
    cleanupInterval();
    document.exitPointerLock();
  };

  const onFormSubmit = (data: ServiceFormData) => {
    onSubmit(data);
    startService({
      movementInterval: data.movementInterval,
      randomizeCoordinates: data.randomizeCoordinates
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label>
          Randomize Coordinates:
          <input type="checkbox" {...register('randomizeCoordinates')} />
        </label>
      </div>

      <div>
        <label>
          Movement Interval (ms):
          <input
            type="number"
            defaultValue={5000}
            {...register('movementInterval', { min: 1000, max: 30000 })}
          />
        </label>
        {errors.movementInterval && (
          <span>Must be between 1000 and 30000 milliseconds</span>
        )}
      </div>

      <div>
        {!isPointerLocked ? (
          <button type="button" onClick={handlePointerLock}>
            Enable Pointer Lock
          </button>
        ) : (
          <button type="button" onClick={stopService}>
            Stop Service
          </button>
        )}
      </div>

      <button type="submit" disabled={!isPointerLocked}>
        Start Service
      </button>
    </form>
  );
};

export default ServiceForm;