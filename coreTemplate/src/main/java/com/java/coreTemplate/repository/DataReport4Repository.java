package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.DataReport4;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DataReport4Repository extends JpaRepository<DataReport4, Long> {

    // Find by exact name using derived query
    Optional<DataReport4> findByName(String name);

    // Find all reports created after a specific date
    List<DataReport4> findByCreationDateAfter(LocalDate date);

    // Find reports by status using IN clause
    List<DataReport4> findByStatusIn(List<String> statuses);

    // Custom JPQL query with join fetch for performance
    @Query("SELECT r FROM DataReport4 r LEFT JOIN FETCH r.details WHERE r.id = :id")
    Optional<DataReport4> findByIdWithDetails(@Param("id") Long id);

    // Native query for complex reporting needs
    @Query(
        value = "SELECT * FROM data_report_4 WHERE creation_date BETWEEN :start AND :end ORDER BY creation_date DESC",
        nativeQuery = true
    )
    List<DataReport4> findReportsBetweenDates(
        @Param("start") LocalDate startDate,
        @Param("end") LocalDate endDate
    );

    // Projection interface for partial data retrieval
    @Query("SELECT r.name as name, r.status as status FROM DataReport4 r WHERE r.id = :id")
    Optional<ReportSummary> findSummaryById(@Param("id") Long id);

    // Count reports by status
    long countByStatus(String status);

    // Delete by status with return count
    long deleteByStatus(String status);

    // Check if exists by name ignoring case
    boolean existsByNameIgnoreCase(String name);

    // Interface for projection
    interface ReportSummary {
        String getName();
        String getStatus();
    }
}