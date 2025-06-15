package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Module1;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface Module1Repository extends JpaRepository<Module1, Long> {

    // Derived query method with Optional return type
    Optional<Module1> findByName(String name);

    // Collection query with sorting
    List<Module1> findByStatusOrderByCreatedDateDesc(String status);

    // Boolean condition query
    boolean existsByCode(String code);

    // Custom JPQL query with named parameters
    @Query("SELECT m FROM Module1 m WHERE m.createdDate BETWEEN :start AND :end")
    List<Module1> findBetweenDates(@Param("start") LocalDateTime start, 
                                  @Param("end") LocalDateTime end);

    // Native query with projection
    @Query(value = "SELECT name, description FROM module1 WHERE active = true", nativeQuery = true)
    List<Object[]> findActiveModules();

    // Query with SpEL expressions
    @Query("SELECT m FROM Module1 m WHERE m.name LIKE %?#{[0]}%")
    List<Module1> findByPartialName(String partialName);

    // Update query with @Modifying
    @Modifying
    @Query("UPDATE Module1 m SET m.status = :status WHERE m.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") String status);

    // Query with entity graph for eager loading
    @EntityGraph(attributePaths = {"relatedEntities"})
    List<Module1> findAllWithRelatedEntitiesBy();

    // Stream support for large result sets
    Stream<Module1> streamAllByActiveTrue();

    // Query with case-insensitive search
    List<Module1> findByNameContainingIgnoreCase(String namePart);

    // Delete query with return count
    long deleteByStatus(String status);
}