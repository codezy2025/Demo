package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form10;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Form10Repository extends JpaRepository<Form10, Long> {

    // Find by exact form number using derived query
    Optional<Form10> findByFormNumber(String formNumber);

    // Find all forms submitted after a certain date
    List<Form10> findBySubmissionDateAfter(LocalDate date);

    // Find forms by status using case-insensitive search
    List<Form10> findByStatusIgnoreCase(String status);

    // Find forms by submitter email with pagination support
    Page<Form10> findBySubmitterEmail(String email, Pageable pageable);

    // Custom JPQL query with join
    @Query("SELECT f FROM Form10 f JOIN f.submitter s WHERE s.department = :department")
    List<Form10> findByDepartment(@Param("department") String department);

    // Native query for complex reporting needs
    @Query(value = "SELECT * FROM form10 f WHERE f.submission_date BETWEEN :start AND :end", nativeQuery = true)
    List<Form10> findFormsSubmittedBetween(@Param("start") LocalDate startDate, @Param("end") LocalDate endDate);

    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.Form10Summary(f.id, f.formNumber, f.submissionDate) " +
           "FROM Form10 f WHERE f.status = 'APPROVED'")
    List<Form10Summary> findApprovedFormsSummary();

    // Update query using @Modifying
    @Modifying
    @Query("UPDATE Form10 f SET f.status = :status WHERE f.id = :id")
    int updateFormStatus(@Param("id") Long id, @Param("status") String status);

    // Exists check with derived query
    boolean existsByFormNumber(String formNumber);

    // Count by status
    long countByStatus(String status);
}