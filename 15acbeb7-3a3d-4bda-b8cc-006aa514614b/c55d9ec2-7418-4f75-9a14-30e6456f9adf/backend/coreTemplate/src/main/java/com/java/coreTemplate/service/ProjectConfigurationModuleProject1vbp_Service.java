package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ProjectConfigurationModuleProject1vbp_Repository;
import com.java.coreTemplate.model.dto.ProjectConfigurationModuleProject1vbp_;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProjectConfigurationModuleProject1vbp_Service {

    private final ProjectConfigurationModuleProject1vbp_Repository repository;

    public ProjectConfigurationModuleProject1vbp_Service(ProjectConfigurationModuleProject1vbp_Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "projectConfigs", allEntries = true)
    public ProjectConfigurationModuleProject1vbp_ save(ProjectConfigurationModuleProject1vbp_ entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "projectConfigs", key = "#id")
    public Optional<ProjectConfigurationModuleProject1vbp_> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("projectConfigs")
    public List<ProjectConfigurationModuleProject1vbp_> findAll() {
        return repository.findAll();
    }

    public Page<ProjectConfigurationModuleProject1vbp_> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<ProjectConfigurationModuleProject1vbp_> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "projectConfigs", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "projectConfigs", allEntries = true)
    public List<ProjectConfigurationModuleProject1vbp_> saveAll(List<ProjectConfigurationModuleProject1vbp_> entities) {
        return repository.saveAll(entities);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}