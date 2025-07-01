package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Storagepy;

import java.util.List;
import java.util.Optional;

public interface StoragepyRepository extends JpaRepository<Storagepy, Long> {

    // Find by name using derived query method
    Optional<Storagepy> findByName(String name);

    // Find all active storage items
    List<Storagepy> findByIsActiveTrue();

    // Find by name containing (case-insensitive)
    List<Storagepy> findByNameContainingIgnoreCase(String namePart);

    // Find by capacity greater than
    List<Storagepy> findByCapacityGreaterThan(int capacity);

    // Custom JPQL query with join fetch for performance
    @Query("SELECT s FROM Storagepy s LEFT JOIN FETCH s.items WHERE s.id = :id")
    Optional<Storagepy> findByIdWithItems(@Param("id") Long id);

    // Native query for complex operations
    @Query(value = "SELECT * FROM storagepy WHERE created_at > CURRENT_DATE - INTERVAL '7 days'", nativeQuery = true)
    List<Storagepy> findRecentStorage();

    // Projection interface for partial data
    @Query("SELECT s.name as name, s.capacity as capacity FROM Storagepy s WHERE s.type = :type")
    List<StorageSummary> findSummaryByType(@Param("type") String type);

    // Update query using @Modifying
    @Modifying
    @Query("UPDATE Storagepy s SET s.isActive = false WHERE s.lastAccessed < :cutoffDate")
    int deactivateOldStorages(@Param("cutoffDate") LocalDateTime cutoffDate);

    // Delete by status
    @Modifying
    void deleteByIsActiveFalse();

    // Count by type
    long countByType(String type);

    // Exists by name
    boolean existsByName(String name);

    // Interface for projection
    interface StorageSummary {
        String getName();
        int getCapacity();
    }
}