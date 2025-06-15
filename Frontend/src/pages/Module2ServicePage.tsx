/**
 * 🏗️  DEVELOPMENT GUIDE - Module2Service Service
 * 
 * 📋 Original Requirements: Create a TypeScript service module that provides frontend equivalents to the Module2 database functionality. This should be an API service layer that would communicate with a backend that handles the actual database operations.

Key Features to Implement:
1. Database connection management (abstracted as API configuration)
2. Recordset operations (as API calls returning data)
3. User activity tracking (login/logout API calls)
4. Global state management (using React context instead of global variables)

Include proper TypeScript interfaces for all data types and API responses.
 * 
 * 🚀 Enhancement Ideas:
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Module2Service[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Module2ServiceStats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import React, { useState, useEffect } from 'react';
import Module2ServiceForm from '../components/Module2ServiceForm';
import Module2ServiceList from '../components/Module2ServiceList';
import module2ServiceService from '../services/module2ServiceService';
import { Module2ServiceType } from '../types/Module2ServiceTypes';

const Module2ServicePage: React.FC = () => {
  const [services, setServices] = useState<Module2ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentService, setCurrentService] = useState<Module2ServiceType | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await module2ServiceService.getAll();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (service: Module2ServiceType) => {
    try {
      await module2ServiceService.create(service);
      await fetchServices();
    } catch (err) {
      setError('Failed to create service');
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, service: Module2ServiceType) => {
    try {
      await module2ServiceService.update(id, service);
      await fetchServices();
      setCurrentService(null);
    } catch (err) {
      setError('Failed to update service');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await module2ServiceService.delete(id);
      await fetchServices();
    } catch (err) {
      setError('Failed to delete service');
      console.error(err);
    }
  };

  const handleEdit = (service: Module2ServiceType) => {
    setCurrentService(service);
  };

  const handleCancel = () => {
    setCurrentService(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Module 2 Services</h1>
      <Module2ServiceForm
        onSubmit={currentService ? (service) => handleUpdate(currentService.id, service) : handleCreate}
        onCancel={currentService ? handleCancel : undefined}
        initialData={currentService}
      />
      <Module2ServiceList
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Module2ServicePage;