package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form4Repository;
import com.java.coreTemplate.model.dto.Form4;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class Form4Service {
    private final Form4Repository repository;

    public Form4Service(Form4Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "form4Cache", allEntries = true)
    public Form4 save(Form4 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "form4Cache", key = "#id")
    public Optional<Form4> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable(value = "form4Cache")
    public Page<Form4> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Form4> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "form4Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "form4Cache", allEntries = true)
    public Form4 update(Form4 entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Cacheable(value = "form4Cache", key = "#status")
    public List<Form4> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    @Cacheable(value = "form4Cache", key = "#name")
    public List<Form4> findByNameContaining(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}