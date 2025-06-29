package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.ProjectConfigurationModuleProject1vbp_;

import java.util.List;
import java.util.Optional;

public interface ProjectConfigurationModuleProject1vbp_Repository extends 
    JpaRepository<ProjectConfigurationModuleProject1vbp_, Long> {
    
    // Find by exact name match
    Optional<ProjectConfigurationModuleProject1vbp_> findByName(String name);
    
    // Find all active configurations
    List<ProjectConfigurationModuleProject1vbp_> findAllByIsActiveTrue();
    
    // Find by name containing (case-insensitive)
    List<ProjectConfigurationModuleProject1vbp_> findByNameContainingIgnoreCase(String namePart);
    
    // Custom query with JPQL
    @Query("SELECT p FROM ProjectConfigurationModuleProject1vbp_ p WHERE p.version = :version AND p.isActive = true")
    List<ProjectConfigurationModuleProject1vbp_> findActiveByVersion(@Param("version") String version);
    
    // Native query for complex operations
    @Query(value = "SELECT * FROM project_config_module_p1vbp WHERE created_date > CURRENT_DATE - INTERVAL '30 days'", nativeQuery = true)
    List<ProjectConfigurationModuleProject1vbp_> findRecentConfigurations();
    
    // Projection query
    @Query("SELECT p.name, p.version FROM ProjectConfigurationModuleProject1vbp_ p WHERE p.id = :id")
    <T> T findNameAndVersionById(@Param("id") Long id, Class<T> type);
    
    // Exists check
    boolean existsByNameAndVersion(String name, String version);
    
    // Delete by status
    long deleteByIsActiveFalse();
    
    // Count by version
    long countByVersion(String version);
}