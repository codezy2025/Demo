package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Module2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface Module2Repository extends JpaRepository<Module2, Long> {

    // Derived query method to find by name
    Optional<Module2> findByName(String name);

    // Derived query method to find all active records
    List<Module2> findByActiveTrue();

    // Derived query method to find by name containing (case-insensitive)
    List<Module2> findByNameContainingIgnoreCase(String nameFragment);

    // JPQL query with modern parameter binding
    @Query("SELECT m FROM Module2 m WHERE m.createdAt BETWEEN :start AND :end")
    List<Module2> findByCreatedAtBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    // Native query with projection
    @Query(value = "SELECT name, description FROM module2 WHERE status = :status", nativeQuery = true)
    List<Object[]> findNameAndDescriptionByStatus(@Param("status") String status);

    // Query method with multiple conditions
    List<Module2> findByNameAndActive(String name, boolean active);

    // Query method with ordering
    List<Module2> findByTypeOrderByCreatedAtDesc(String type);

    // Query method with exists check
    boolean existsByName(String name);

    // Query method with count
    long countByActiveTrue();

    // Query method with delete
    void deleteByActiveFalse();

    // Custom query using JPA EntityGraph for eager loading
    @EntityGraph(attributePaths = {"relatedEntities"})
    @Query("SELECT m FROM Module2 m WHERE m.id = :id")
    Optional<Module2> findByIdWithRelatedEntities(@Param("id") Long id);
}