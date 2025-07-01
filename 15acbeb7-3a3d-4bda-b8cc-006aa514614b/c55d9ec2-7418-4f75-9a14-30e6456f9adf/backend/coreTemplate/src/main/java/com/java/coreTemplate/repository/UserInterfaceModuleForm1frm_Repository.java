package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.UserInterfaceModuleForm1frm_;

import java.util.List;
import java.util.Optional;

public interface UserInterfaceModuleForm1frm_Repository extends 
    JpaRepository<UserInterfaceModuleForm1frm_, Long> {
    
    // Find by exact name match
    Optional<UserInterfaceModuleForm1frm_> findByName(String name);
    
    // Find all records where name contains the given string (case-insensitive)
    List<UserInterfaceModuleForm1frm_> findByNameContainingIgnoreCase(String namePart);
    
    // Find all active records
    List<UserInterfaceModuleForm1frm_> findByIsActiveTrue();
    
    // Custom JPQL query with join (assuming there's a related entity)
    @Query("SELECT f FROM UserInterfaceModuleForm1frm_ f JOIN f.someRelatedEntity r WHERE r.status = :status")
    List<UserInterfaceModuleForm1frm_> findByRelatedEntityStatus(@Param("status") String status);
    
    // Native query for complex operations
    @Query(value = "SELECT * FROM user_interface_module_form1frm_ WHERE created_date > CURRENT_DATE - INTERVAL '7 days'", nativeQuery = true)
    List<UserInterfaceModuleForm1frm_> findRecentForms();
    
    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.UserInterfaceModuleForm1frm_(f.id, f.name) FROM UserInterfaceModuleForm1frm_ f WHERE f.isActive = true")
    List<UserInterfaceModuleForm1frm_> findActiveFormsWithLimitedFields();
    
    // Update query using @Modifying
    @Modifying
    @Query("UPDATE UserInterfaceModuleForm1frm_ f SET f.isActive = false WHERE f.createdDate < :cutoffDate")
    int deactivateOldForms(@Param("cutoffDate") LocalDate cutoffDate);
    
    // Exists query
    boolean existsByNameAndIsActiveTrue(String name);
    
    // Count query
    long countByIsActiveTrue();
}