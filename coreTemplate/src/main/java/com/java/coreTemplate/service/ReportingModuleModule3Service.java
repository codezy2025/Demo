package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.java.coreTemplate.repository.ReportingModuleModule3Repository;
import com.java.coreTemplate.model.dto.ReportingModuleModule3;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ReportingModuleModule3Service {

    private final ReportingModuleModule3Repository repository;

    public ReportingModuleModule3Service(ReportingModuleModule3Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "reportingModule3Cache", allEntries = true)
    public ReportingModuleModule3 save(ReportingModuleModule3 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "reportingModule3Cache", key = "#id")
    public Optional<ReportingModuleModule3> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable(value = "reportingModule3Cache")
    public List<ReportingModuleModule3> findAll() {
        return repository.findAll();
    }

    public Page<ReportingModuleModule3> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "reportingModule3Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<ReportingModuleModule3> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public Page<ReportingModuleModule3> findAllActive(Pageable pageable) {
        return repository.findByIsActiveTrue(pageable);
    }

    @Cacheable(value = "reportingModule3Cache", key = "#name")
    public List<ReportingModuleModule3> findByNameContaining(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    @Transactional
    @CacheEvict(value = "reportingModule3Cache", key = "#id")
    public ReportingModuleModule3 update(Long id, ReportingModuleModule3 updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    existingEntity.setName(updatedEntity.getName());
                    // Add other fields to update
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }
}