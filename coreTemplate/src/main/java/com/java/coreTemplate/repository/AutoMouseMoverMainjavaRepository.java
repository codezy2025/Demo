package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.AutoMouseMoverMainjava;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AutoMouseMoverMainjavaRepository extends 
    JpaRepository<AutoMouseMoverMainjava, Long> {
    
    // Find by exact name using derived query
    Optional<AutoMouseMoverMainjava> findByName(String name);
    
    // Find all active configurations
    List<AutoMouseMoverMainjava> findByIsActiveTrue();
    
    // Find configurations created after a specific date
    List<AutoMouseMoverMainjava> findByCreatedAtAfter(LocalDateTime date);
    
    // Find by name containing a string (case-insensitive)
    List<AutoMouseMoverMainjava> findByNameContainingIgnoreCase(String namePart);
    
    // Custom JPQL query with join (assuming there's a related entity)
    @Query("SELECT a FROM AutoMouseMoverMainjava a JOIN a.settings s WHERE s.interval = :interval")
    List<AutoMouseMoverMainjava> findByMovementInterval(@Param("interval") int interval);
    
    // Native query for complex operations
    @Query(value = "SELECT * FROM auto_mouse_mover WHERE last_used > :cutoffDate", nativeQuery = true)
    List<AutoMouseMoverMainjava> findRecentlyUsed(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    // Projection query returning only needed fields
    @Query("SELECT new com.java.coreTemplate.model.dto.AutoMouseMoverMainjava(a.id, a.name) FROM AutoMouseMoverMainjava a WHERE a.isActive = true")
    List<AutoMouseMoverMainjava> findActiveConfigurationsSummary();
    
    // Update query using @Modifying
    @Modifying
    @Query("UPDATE AutoMouseMoverMainjava a SET a.isActive = false WHERE a.lastUsed < :expiryDate")
    int deactivateExpiredConfigurations(@Param("expiryDate") LocalDateTime expiryDate);
}