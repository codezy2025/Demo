package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.UserInterfaceModuleForm1frm_;

import java.util.List;
import java.util.Optional;

public interface UserInterfaceModuleForm1frm_Repository extends 
    JpaRepository<UserInterfaceModuleForm1frm_, Long> {
    
    // Find by exact form name using derived query method
    Optional<UserInterfaceModuleForm1frm_> findByFormName(String formName);
    
    // Find all forms containing text in description (case-insensitive)
    List<UserInterfaceModuleForm1frm_> findByDescriptionContainingIgnoreCase(String description);
    
    // Find forms by status using enum (assuming status is an enum field)
    List<UserInterfaceModuleForm1frm_> findByStatus(UserInterfaceModuleForm1frm_.Status status);
    
    // Custom JPQL query with join (assuming relationship with User entity)
    @Query("SELECT f FROM UserInterfaceModuleForm1frm_ f JOIN f.createdBy u WHERE u.username = :username")
    List<UserInterfaceModuleForm1frm_> findByCreatedByUsername(@Param("username") String username);
    
    // Native query for complex operations
    @Query(
        value = "SELECT * FROM ui_module_form1frm WHERE last_modified_date > CURRENT_DATE - INTERVAL '7' DAY",
        nativeQuery = true
    )
    List<UserInterfaceModuleForm1frm_> findFormsModifiedInLastWeek();
    
    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.FormSummary(f.id, f.formName, f.createdDate) " +
           "FROM UserInterfaceModuleForm1frm_ f WHERE f.status = 'ACTIVE'")
    List<FormSummary> findActiveFormSummaries();
    
    // Exists query for validation
    boolean existsByFormNameAndVersion(String formName, String version);
    
    // Delete by status with transactional annotation
    @Transactional
    void deleteByStatus(UserInterfaceModuleForm1frm_.Status status);
    
    // Count forms by status
    long countByStatus(UserInterfaceModuleForm1frm_.Status status);
}