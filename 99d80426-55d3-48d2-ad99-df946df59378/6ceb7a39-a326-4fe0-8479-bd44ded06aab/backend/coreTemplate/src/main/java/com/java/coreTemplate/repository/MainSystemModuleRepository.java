package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.MainSystemModule;

import java.util.List;
import java.util.Optional;

public interface MainSystemModuleRepository extends JpaRepository<MainSystemModule, Long> {

    // Find by module name using derived query
    Optional<MainSystemModule> findByName(String name);

    // Find by name containing (case-insensitive)
    List<MainSystemModule> findByNameContainingIgnoreCase(String nameFragment);

    // Find active modules
    List<MainSystemModule> findByIsActiveTrue();

    // Find modules with version greater than specified
    List<MainSystemModule> findByVersionGreaterThan(String version);

    // Custom JPQL query with join fetch for performance
    @Query("SELECT m FROM MainSystemModule m LEFT JOIN FETCH m.subModules WHERE m.id = :id")
    Optional<MainSystemModule> findByIdWithSubModules(@Param("id") Long id);

    // Native query for complex operations
    @Query(value = "SELECT * FROM main_system_modules WHERE created_at > CURRENT_DATE - INTERVAL '7 days'", nativeQuery = true)
    List<MainSystemModule> findRecentlyCreated();

    // Projection query returning only specific fields
    @Query("SELECT m.name, m.version FROM MainSystemModule m WHERE m.isActive = true")
    List<Object[]> findActiveModuleNamesAndVersions();

    // Find by multiple criteria using JPA Specifications style method name
    List<MainSystemModule> findByNameAndVersionAndIsActive(String name, String version, boolean isActive);

    // Update status for multiple IDs in a single query
    @Modifying
    @Query("UPDATE MainSystemModule m SET m.isActive = :status WHERE m.id IN :ids")
    int updateStatusForModules(@Param("ids") List<Long> ids, @Param("status") boolean status);

    // Count active modules by version prefix
    long countByVersionStartingWithAndIsActiveTrue(String versionPrefix);
}