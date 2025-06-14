package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.java.coreTemplate.repository.UtilityModuleModule1Repository;
import com.java.coreTemplate.model.dto.UtilityModuleModule1;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UtilityModuleModule1Service {

    private final UtilityModuleModule1Repository repository;

    public UtilityModuleModule1Service(UtilityModuleModule1Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "utilityModule1Cache", allEntries = true)
    public UtilityModuleModule1 save(UtilityModuleModule1 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "utilityModule1Cache", key = "#id")
    public Optional<UtilityModuleModule1> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("utilityModule1Cache")
    public List<UtilityModuleModule1> findAll() {
        return repository.findAll();
    }

    public Page<UtilityModuleModule1> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<UtilityModuleModule1> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "utilityModule1Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "utilityModule1Cache", allEntries = true)
    public UtilityModuleModule1 update(UtilityModuleModule1 entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}