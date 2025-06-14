package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form6Repository;
import com.java.coreTemplate.model.dto.Form6;
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
public class Form6Service {

    private final Form6Repository repository;

    public Form6Service(Form6Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "form6Cache", allEntries = true)
    public Form6 save(Form6 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "form6Cache", key = "#id")
    public Optional<Form6> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("form6Cache")
    public List<Form6> findAll() {
        return repository.findAll();
    }

    public Page<Form6> findAllPaginated(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable(value = "form6Cache", key = "'active'")
    public List<Form6> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "form6Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Async
    public CompletableFuture<List<Form6>> findAllAsync() {
        return CompletableFuture.completedFuture(repository.findAll());
    }

    @Transactional
    @CacheEvict(value = "form6Cache", allEntries = true)
    public Form6 update(Form6 entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Cacheable(value = "form6Cache", key = "#name")
    public List<Form6> findByNameContaining(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}