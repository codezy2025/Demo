package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form12;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Form12Repository extends JpaRepository<Form12, Long> {

    // Derived query method to find by form number
    Optional<Form12> findByFormNumber(String formNumber);

    // Derived query method to find forms submitted after a certain date
    List<Form12> findBySubmissionDateAfter(LocalDate date);

    // JPQL query with modern parameter binding
    @Query("SELECT f FROM Form12 f WHERE f.status = :status AND f.submissionDate BETWEEN :startDate AND :endDate")
    List<Form12> findFormsByStatusAndDateRange(
            @Param("status") String status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // Native query with projection
    @Query(value = "SELECT form_number, submission_date FROM form12 WHERE created_by = :userId", nativeQuery = true)
    List<Object[]> findFormNumbersAndDatesByUser(@Param("userId") Long userId);

    // Boolean exists check with modern syntax
    boolean existsByFormNumberAndStatus(String formNumber, String status);

    // Custom update query with modern syntax
    @Modifying
    @Query("UPDATE Form12 f SET f.status = :newStatus WHERE f.id = :id")
    int updateFormStatus(@Param("id") Long id, @Param("newStatus") String newStatus);

    // Stream support for large result sets
    @Query("SELECT f FROM Form12 f WHERE f.department = :department")
    Stream<Form12> streamAllByDepartment(@Param("department") String department);

    // Find with pagination support
    Page<Form12> findByStatus(String status, Pageable pageable);

    // Find using SpEL expressions
    @Query("SELECT f FROM Form12 f WHERE f.submissionDate = ?#{T(java.time.LocalDate).now()}")
    List<Form12> findFormsSubmittedToday();

    // Find using case-insensitive search
    List<Form12> findByDescriptionContainingIgnoreCase(String description);

    // Find using multiple conditions with AND/OR
    List<Form12> findByStatusOrPriority(String status, String priority);
}