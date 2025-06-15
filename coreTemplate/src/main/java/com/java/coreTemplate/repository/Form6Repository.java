package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form6;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Form6Repository extends JpaRepository<Form6, Long> {

    // Find by exact form number using derived query
    Optional<Form6> findByFormNumber(String formNumber);

    // Find all forms submitted after a certain date
    List<Form6> findBySubmissionDateAfter(LocalDate date);

    // Find forms by status using case-insensitive search
    List<Form6> findByStatusIgnoreCase(String status);

    // Find forms by submitter's email with pagination support
    Page<Form6> findBySubmitterEmail(String email, Pageable pageable);

    // Custom JPQL query with join
    @Query("SELECT f FROM Form6 f JOIN f.submitter s WHERE s.department = :dept")
    List<Form6> findByDepartment(@Param("dept") String department);

    // Native query for complex reporting needs
    @Query(value = """
           SELECT f.* FROM form6 f 
           WHERE f.submission_date BETWEEN :startDate AND :endDate
           AND f.status = 'APPROVED'
           ORDER BY f.submission_date DESC
           """, nativeQuery = true)
    List<Form6> findApprovedFormsInDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.Form6Summary(f.id, f.formNumber, f.submissionDate) " +
           "FROM Form6 f WHERE f.status = :status")
    List<Form6Summary> findFormSummariesByStatus(@Param("status") String status);

    // Update query using @Modifying
    @Modifying
    @Query("UPDATE Form6 f SET f.status = :newStatus WHERE f.id = :id")
    int updateFormStatus(@Param("id") Long id, @Param("newStatus") String newStatus);

    // Exists query for validation
    boolean existsByFormNumberAndSubmissionDateBetween(
            String formNumber, 
            LocalDate startDate, 
            LocalDate endDate);

    // Count query for statistics
    long countByStatus(String status);
}