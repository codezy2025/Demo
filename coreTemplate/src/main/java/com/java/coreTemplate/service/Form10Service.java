package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form10Repository;
import com.java.coreTemplate.model.dto.Form10;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class Form10Service {

    private final Form10Repository repository;

    @Transactional
    @CacheEvict(value = "form10Cache", allEntries = true)
    public Form10 save(Form10 entity) {
        log.info("Saving Form10 with ID: {}", entity.getId());
        return repository.save(entity);
    }

    @Cacheable(value = "form10Cache", key = "#id")
    public Optional<Form10> findById(Long id) {
        log.info("Fetching Form10 with ID: {}", id);
        return repository.findById(id);
    }

    @Cacheable(value = "form10Cache")
    public Page<Form10> findAll(Pageable pageable) {
        log.info("Fetching all Form10s with pagination");
        return repository.findAll(pageable);
    }

    public List<Form10> findAllActive() {
        log.info("Fetching all active Form10s");
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "form10Cache", key = "#id")
    public void deactivate(Long id) {
        log.info("Deactivating Form10 with ID: {}", id);
        repository.findById(id).ifPresent(entity -> {
            entity.setActive(false);
            repository.save(entity);
        });
    }

    @Transactional
    @CacheEvict(value = "form10Cache", allEntries = true)
    public void delete(Long id) {
        log.info("Deleting Form10 with ID: {}", id);
        repository.deleteById(id);
    }

    public boolean existsById(Long id) {
        log.info("Checking existence of Form10 with ID: {}", id);
        return repository.existsById(id);
    }

    @Cacheable(value = "form10Cache", key = "#name")
    public List<Form10> findByNameContaining(String name) {
        log.info("Searching Form10s containing name: {}", name);
        return repository.findByNameContainingIgnoreCase(name);
    }
}