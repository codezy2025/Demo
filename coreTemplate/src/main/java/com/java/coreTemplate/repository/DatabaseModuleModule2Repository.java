package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.DatabaseModuleModule2;

import java.util.List;
import java.util.Optional;

public interface DatabaseModuleModule2Repository extends 
    JpaRepository<DatabaseModuleModule2, Long> {
    
    // Find by exact name match using derived query
    Optional<DatabaseModuleModule2> findByName(String name);
    
    // Find all records where name contains the given string (case-insensitive)
    List<DatabaseModuleModule2> findByNameContainingIgnoreCase(String name);
    
    // Find by status using derived query
    List<DatabaseModuleModule2> findByStatus(String status);
    
    // Custom JPQL query with join (if needed)
    @Query("SELECT d FROM DatabaseModuleModule2 d WHERE d.createdAt > CURRENT_DATE - :days")
    List<DatabaseModuleModule2> findRecentRecords(@Param("days") int days);
    
    // Native query example
    @Query(value = "SELECT * FROM database_module_module2 WHERE status = :status ORDER BY created_at DESC LIMIT :limit", 
           nativeQuery = true)
    List<DatabaseModuleModule2> findLatestByStatus(@Param("status") String status, @Param("limit") int limit);
    
    // Projection interface example
    @Query("SELECT d.name as name, d.status as status FROM DatabaseModuleModule2 d WHERE d.id = :id")
    Optional<DatabaseModuleModule2Info> findInfoById(@Param("id") Long id);
    
    // Update query example
    @Modifying
    @Query("UPDATE DatabaseModuleModule2 d SET d.status = :status WHERE d.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") String status);
    
    // Boolean exists check
    boolean existsByName(String name);
    
    // Count by status
    long countByStatus(String status);
    
    // Delete by status
    @Modifying
    int deleteByStatus(String status);
    
    // Interface for projection
    interface DatabaseModuleModule2Info {
        String getName();
        String getStatus();
    }
}