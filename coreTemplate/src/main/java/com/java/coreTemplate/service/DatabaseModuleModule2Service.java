package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.DatabaseModuleModule2Repository;
import com.java.coreTemplate.model.dto.DatabaseModuleModule2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class DatabaseModuleModule2Service {

    private final DatabaseModuleModule2Repository repository;

    public DatabaseModuleModule2Service(DatabaseModuleModule2Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "module2Cache", allEntries = true)
    public DatabaseModuleModule2 save(DatabaseModuleModule2 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "module2Cache", key = "#id")
    public Optional<DatabaseModuleModule2> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("module2Cache")
    public List<DatabaseModuleModule2> findAll() {
        return repository.findAll();
    }

    public Page<DatabaseModuleModule2> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "module2Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Cacheable("module2Cache")
    public List<DatabaseModuleModule2> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable("module2Cache")
    public List<DatabaseModuleModule2> findByNameContaining(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    @Transactional
    @CacheEvict(value = "module2Cache", key = "#id")
    public DatabaseModuleModule2 update(Long id, DatabaseModuleModule2 updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    // exisingEntity.setName(updatedEntity.getName());
                    // etc.
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }

    @Cacheable("module2Cache")
    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}