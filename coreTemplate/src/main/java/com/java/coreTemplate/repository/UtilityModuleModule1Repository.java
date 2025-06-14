package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.UtilityModuleModule1;

import java.util.List;
import java.util.Optional;

public interface UtilityModuleModule1Repository extends 
    JpaRepository<UtilityModuleModule1, Long> {
    
    // Derived query methods
    List<UtilityModuleModule1> findByModuleNameContainingIgnoreCase(String moduleName);
    
    Optional<UtilityModuleModule1> findByModuleCode(String moduleCode);
    
    List<UtilityModuleModule1> findByActiveTrue();
    
    long countByModuleType(String moduleType);
    
    // JPQL with modern parameter binding
    @Query("SELECT u FROM UtilityModuleModule1 u WHERE u.createdAt >= CURRENT_DATE")
    List<UtilityModuleModule1> findTodayCreatedModules();
    
    @Query("SELECT u FROM UtilityModuleModule1 u WHERE u.moduleType = :type AND u.active = :status")
    List<UtilityModuleModule1> findByTypeAndStatus(
        @Param("type") String moduleType, 
        @Param("status") boolean active);
    
    // Native query with projection
    @Query(value = 
        "SELECT module_name, module_code FROM utility_module_module1 WHERE module_type = ?1",
        nativeQuery = true)
    List<Object[]> findModuleNamesAndCodesByType(String moduleType);
    
    // Update query
    @Modifying
    @Query("UPDATE UtilityModuleModule1 u SET u.active = false WHERE u.lastAccessed < :cutoffDate")
    int deactivateInactiveModules(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    // Exists query
    boolean existsByModuleCodeAndActiveTrue(String moduleCode);
    
    // Delete query
    void deleteByModuleCode(String moduleCode);
    
    // Custom method with sorting
    List<UtilityModuleModule1> findByModuleTypeOrderByCreatedAtDesc(String moduleType);
    
    // Stream support for large result sets
    @Query("SELECT u FROM UtilityModuleModule1 u WHERE u.moduleType = :type")
    Stream<UtilityModuleModule1> streamByModuleType(@Param("type") String moduleType);
}