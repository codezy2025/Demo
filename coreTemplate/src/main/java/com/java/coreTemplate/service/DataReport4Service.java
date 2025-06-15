package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.DataReport4Repository;
import com.java.coreTemplate.model.dto.DataReport4;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class DataReport4Service {

    private final DataReport4Repository repository;

    public DataReport4Service(DataReport4Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "dataReport4Cache", allEntries = true)
    public DataReport4 save(DataReport4 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "dataReport4Cache", key = "#id")
    public Optional<DataReport4> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("dataReport4Cache")
    public List<DataReport4> findAll() {
        return repository.findAll();
    }

    @Cacheable("dataReport4Cache")
    public Page<DataReport4> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "dataReport4Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<DataReport4> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public Page<DataReport4> findAllActive(Pageable pageable) {
        return repository.findByIsActiveTrue(pageable);
    }

    @Transactional
    @CacheEvict(value = "dataReport4Cache", key = "#id")
    public DataReport4 update(Long id, DataReport4 updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    // existingEntity.setField(updatedEntity.getField());
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}