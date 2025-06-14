package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.ReportingModuleModule3;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReportingModuleModule3Repository extends 
    JpaRepository<ReportingModuleModule3, Long> {

    // Find by exact name match
    Optional<ReportingModuleModule3> findByName(String name);

    // Find all records created after a specific date
    List<ReportingModuleModule3> findByCreatedAtAfter(LocalDateTime date);

    // Find by name containing (case-insensitive)
    List<ReportingModuleModule3> findByNameContainingIgnoreCase(String namePart);

    // Find by status with custom JPQL query
    @Query("SELECT r FROM ReportingModuleModule3 r WHERE r.status = :status ORDER BY r.createdAt DESC")
    List<ReportingModuleModule3> findByStatus(@Param("status") String status);

    // Count records by status
    long countByStatus(String status);

    // Find by multiple conditions using method name
    List<ReportingModuleModule3> findByStatusAndCreatedAtBetween(
        String status, 
        LocalDateTime startDate, 
        LocalDateTime endDate);

    // Custom native query for complex reporting needs
    @Query(
        value = "SELECT * FROM reporting_module_3 WHERE status = :status AND created_at >= :startDate",
        nativeQuery = true
    )
    List<ReportingModuleModule3> findForReport(
        @Param("status") String status,
        @Param("startDate") LocalDateTime startDate);

    // Projection query returning only specific fields
    @Query("SELECT r.id as id, r.name as name FROM ReportingModuleModule3 r WHERE r.status = :status")
    List<ReportingModule3Projection> findProjectedDataByStatus(@Param("status") String status);

    // Update status by ID using @Modifying
    @Modifying
    @Query("UPDATE ReportingModuleModule3 r SET r.status = :status WHERE r.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") String status);

    // Delete by status
    @Modifying
    void deleteByStatus(String status);
}

// Projection interface for partial data retrieval
interface ReportingModule3Projection {
    Long getId();
    String getName();
}