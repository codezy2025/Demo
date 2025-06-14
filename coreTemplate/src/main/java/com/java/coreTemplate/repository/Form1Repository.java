package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form1;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Form1Repository extends JpaRepository<Form1, Long> {

    // Derived query method
    List<Form1> findByStatus(String status);
    
    // Derived query with multiple conditions
    List<Form1> findByStatusAndSubmissionDateAfter(String status, LocalDate date);
    
    // Optional return type for single result
    Optional<Form1> findByReferenceNumber(String referenceNumber);
    
    // Custom JPQL query with modern parameter binding
    @Query("SELECT f FROM Form1 f WHERE f.submissionDate BETWEEN :start AND :end")
    List<Form1> findFormsSubmittedBetween(
        @Param("start") LocalDate startDate, 
        @Param("end") LocalDate endDate);
    
    // Native query with projection
    @Query(value = "SELECT f.reference_number as referenceNumber, f.status FROM form1 f WHERE f.status = :status", 
           nativeQuery = true)
    List<Form1Projection> findReferenceNumbersByStatus(@Param("status") String status);
    
    // Dynamic sorting with method name
    List<Form1> findByStatusOrderBySubmissionDateDesc(String status);
    
    // Exists query
    boolean existsByReferenceNumber(String referenceNumber);
    
    // Delete query
    long deleteByStatus(String status);
    
    // Custom query with JOIN
    @Query("SELECT f FROM Form1 f JOIN f.submitter s WHERE s.department = :department")
    List<Form1> findByDepartment(@Param("department") String department);
    
    // Stream results for large datasets
    @Query("SELECT f FROM Form1 f WHERE f.status = :status")
    Stream<Form1> streamAllByStatus(@Param("status") String status);
    
    // Interface-based projection
    <T> List<T> findByStatus(String status, Class<T> type);
    
    // Update query with @Modifying
    @Modifying
    @Query("UPDATE Form1 f SET f.status = :newStatus WHERE f.status = :oldStatus")
    int updateStatus(@Param("oldStatus") String oldStatus, @Param("newStatus") String newStatus);
}

// Projection interface for native query
interface Form1Projection {
    String getReferenceNumber();
    String getStatus();
}