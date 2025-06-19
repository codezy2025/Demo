package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ValidatorpyRepository;
import com.java.coreTemplate.model.dto.Validatorpy;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional(readOnly = true)
public class ValidatorpyService {

    private final ValidatorpyRepository repository;

    public ValidatorpyService(ValidatorpyRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", allEntries = true)
    public Validatorpy save(Validatorpy entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "validatorpyCache", key = "#id")
    public Optional<Validatorpy> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable(value = "validatorpyCache")
    public List<Validatorpy> findAll() {
        return repository.findAll();
    }

    @Cacheable(value = "validatorpyCache")
    public Page<Validatorpy> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Validatorpy> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Async
    public CompletableFuture<List<Validatorpy>> findAllActiveAsync() {
        return CompletableFuture.completedFuture(repository.findByIsActiveTrue());
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", key = "#id")
    public Validatorpy update(Long id, Validatorpy updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    // Example: existingEntity.setName(updatedEntity.getName());
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("Validatorpy not found with id: " + id));
    }
}