package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form27;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Form27Repository extends JpaRepository<Form27, Long> {

    // Derived query method to find by form number
    Optional<Form27> findByFormNumber(String formNumber);

    // Derived query method to find all forms submitted after a certain date
    List<Form27> findBySubmissionDateAfter(LocalDate date);

    // JPQL query with modern parameter binding
    @Query("SELECT f FROM Form27 f WHERE f.status = :status AND f.submissionDate BETWEEN :startDate AND :endDate")
    List<Form27> findFormsByStatusAndDateRange(
            @Param("status") String status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // Native query with projection
    @Query(value = "SELECT form_number, submission_date FROM form27 WHERE submitted_by = :userId", nativeQuery = true)
    List<Object[]> findFormNumbersAndDatesByUser(@Param("userId") Long userId);

    // Boolean exists check with modern syntax
    boolean existsByFormNumberAndStatus(String formNumber, String status);

    // Custom delete operation with return count
    long deleteByStatus(String status);

    // Stream support for large result sets
    @Query("SELECT f FROM Form27 f WHERE f.department = :department")
    java.util.stream.Stream<Form27> streamAllByDepartment(@Param("department") String department);

    // Dynamic projection support
    <T> List<T> findBySubmissionDateBetween(LocalDate start, LocalDate end, Class<T> type);

    // Modern update query with @Modifying
    @Modifying
    @Query("UPDATE Form27 f SET f.status = :newStatus WHERE f.id = :id")
    int updateFormStatus(@Param("id") Long id, @Param("newStatus") String newStatus);
}