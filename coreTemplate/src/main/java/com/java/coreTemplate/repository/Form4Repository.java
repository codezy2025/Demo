package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Form4;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface Form4Repository extends JpaRepository<Form4, Long> {

    // Derived query methods
    List<Form4> findByFilingDate(LocalDate filingDate);
    List<Form4> findByFilingDateBetween(LocalDate startDate, LocalDate endDate);
    List<Form4> findByIssuerNameContainingIgnoreCase(String issuerName);
    List<Form4> findByTransactionCode(String transactionCode);
    Optional<Form4> findByFormId(String formId);
    
    // Custom JPQL queries
    @Query("SELECT f FROM Form4 f WHERE f.issuerName LIKE %:keyword% OR f.reportingOwnerName LIKE %:keyword%")
    List<Form4> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT f FROM Form4 f WHERE f.sharesTraded > :minShares AND f.transactionPrice > :minPrice")
    List<Form4> findSignificantTransactions(
        @Param("minShares") int minShares, 
        @Param("minPrice") double minPrice);
    
    // Native query example
    @Query(value = """
        SELECT * FROM form4 
        WHERE filing_date >= CURRENT_DATE - INTERVAL '30 days'
        ORDER BY shares_traded DESC
        LIMIT 10
        """, nativeQuery = true)
    List<Form4> findTopRecentHighVolumeTransactions();
    
    // Projection query
    @Query("SELECT f.issuerName as issuerName, f.reportingOwnerName as ownerName, f.sharesTraded as shares FROM Form4 f WHERE f.filingDate = :date")
    List<Form4Summary> findSummariesByDate(@Param("date") LocalDate date);
    
    // Update query
    @Modifying
    @Query("UPDATE Form4 f SET f.processed = true WHERE f.id IN :ids")
    int markAsProcessed(@Param("ids") List<Long> ids);
    
    // Dynamic sorting
    List<Form4> findByIssuerName(String issuerName, Sort sort);
    
    // Entity graph for performance optimization
    @EntityGraph(attributePaths = {"transactions", "reportingOwner"})
    Optional<Form4> findWithDetailsById(Long id);
    
    // Stream for large result sets
    @QueryHints(value = @QueryHint(name = HINT_FETCH_SIZE, value = "100"))
    Stream<Form4> streamAllByFilingDateAfter(LocalDate date);
    
    // Custom DTO projection
    <T> List<T> findByFilingDateBetween(LocalDate start, LocalDate end, Class<T> type);
}

// Projection interface
interface Form4Summary {
    String getIssuerName();
    String getOwnerName();
    Integer getShares();
}