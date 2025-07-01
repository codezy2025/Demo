package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.MainSystemModuleRepository;
import com.java.coreTemplate.model.dto.MainSystemModule;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MainSystemModuleService {

    private final MainSystemModuleRepository repository;

    @Transactional
    @CacheEvict(value = "modules", allEntries = true)
    public MainSystemModule save(MainSystemModule entity) {
        log.info("Saving MainSystemModule: {}", entity);
        return repository.save(entity);
    }

    @Cacheable(value = "modules", key = "#id")
    public Optional<MainSystemModule> findById(Long id) {
        log.info("Fetching MainSystemModule with id: {}", id);
        return repository.findById(id);
    }

    public List<MainSystemModule> findAll() {
        log.info("Fetching all MainSystemModules");
        return repository.findAll();
    }

    public Page<MainSystemModule> findAll(Pageable pageable) {
        log.info("Fetching all MainSystemModules with pagination");
        return repository.findAll(pageable);
    }

    public List<MainSystemModule> findAllActive() {
        log.info("Fetching all active MainSystemModules");
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "modules", key = "#id")
    public void deleteById(Long id) {
        log.info("Deleting MainSystemModule with id: {}", id);
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "modules", allEntries = true)
    public MainSystemModule update(MainSystemModule entity) {
        log.info("Updating MainSystemModule: {}", entity);
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        log.info("Checking existence of MainSystemModule with id: {}", id);
        return repository.existsById(id);
    }
}