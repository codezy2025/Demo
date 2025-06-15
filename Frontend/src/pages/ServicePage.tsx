/**
 * 🏗️  DEVELOPMENT GUIDE - Service Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Service[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{ServiceStats}>
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
import ServiceForm from '../components/ServiceForm';
import ServiceList from '../components/ServiceList';
import serviceService from '../services/serviceService';
import { Service } from '../types/ServiceTypes';

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getAll();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (service: Omit<Service, 'id'>) => {
    try {
      const createdService = await serviceService.create(service);
      setServices([...services, createdService]);
    } catch (err) {
      setError('Failed to create service');
    }
  };

  const handleUpdate = async (id: string, service: Omit<Service, 'id'>) => {
    try {
      const updatedService = await serviceService.update(id, service);
      setServices(services.map(s => s.id === id ? updatedService : s));
      setEditingService(null);
    } catch (err) {
      setError('Failed to update service');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await serviceService.delete(id);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  return (
    <div>
      <h1>Services</h1>
      {error && <div className="error">{error}</div>}
      <ServiceForm 
        onSubmit={editingService ? (service) => handleUpdate(editingService.id, service) : handleCreate}
        initialData={editingService}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ServiceList 
          services={services} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default ServicePage;