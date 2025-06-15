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

export interface Service {
  requestPointerLock(): Promise<void>;
  releasePointerLock(): void;
  generateRandomCoordinates(): { x: number; y: number };
  setMovementInterval(interval: number): void;
  startMovement(): void;
  stopMovement(): void;
  initializeWorker(): void;
  terminateWorker(): void;
  handlePointerLockError(error: Error): void;
}

export interface ServiceFormData {
  movementInterval: number;
  enableRandomMovement: boolean;
  enablePointerLock: boolean;
}