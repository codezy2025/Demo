package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Validatorpy;

import java.util.List;
import java.util.Optional;

public interface ValidatorpyRepository extends JpaRepository<Validatorpy, Long> {

    // Find by exact name match
    Optional<Validatorpy> findByName(String name);

    // Find by name containing string (case-insensitive)
    List<Validatorpy> findByNameContainingIgnoreCase(String namePart);

    // Find by active status
    List<Validatorpy> findByIsActive(boolean isActive);

    // Custom JPQL query with join (if Validatorpy has relationships)
    @Query("SELECT v FROM Validatorpy v JOIN v.someEntity e WHERE e.id = :entityId")
    List<Validatorpy> findByRelatedEntityId(@Param("entityId") Long entityId);

    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.ValidatorpySummary(v.id, v.name) FROM Validatorpy v WHERE v.isActive = true")
    List<ValidatorpySummary> findActiveValidatorSummaries();

    // Native query for complex operations
    @Query(value = "SELECT * FROM validatorpy WHERE created_at > CURRENT_DATE - INTERVAL '7 days'", nativeQuery = true)
    List<Validatorpy> findRecentValidators();

    // Exists check with modern syntax
    boolean existsByNameAndIsActive(String name, boolean isActive);

    // Delete by status with return count
    long deleteByIsActive(boolean isActive);
}