package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.StoragepyRepository;
import com.java.coreTemplate.model.dto.Storagepy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoragepyService {

    private final StoragepyRepository repository;

    @Transactional
    @CacheEvict(value = "storagepyCache", allEntries = true)
    public Storagepy save(Storagepy entity) {
        log.info("Saving Storagepy entity: {}", entity);
        return repository.save(entity);
    }

    @Cacheable(value = "storagepyCache", key = "#id")
    public Optional<Storagepy> findById(Long id) {
        log.debug("Fetching Storagepy with id: {}", id);
        return repository.findById(id);
    }

    @Cacheable(value = "storagepyCache")
    public List<Storagepy> findAll() {
        log.debug("Fetching all Storagepy entities");
        return repository.findAll();
    }

    @Cacheable(value = "storagepyCache")
    public Page<Storagepy> findAll(Pageable pageable) {
        log.debug("Fetching all Storagepy entities with pagination");
        return repository.findAll(pageable);
    }

    @Cacheable(value = "storagepyCache", key = "'active'")
    public List<Storagepy> findAllActive() {
        log.debug("Fetching all active Storagepy entities");
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "storagepyCache", key = "#id")
    public void deleteById(Long id) {
        log.info("Deleting Storagepy with id: {}", id);
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "storagepyCache", allEntries = true)
    public Storagepy update(Storagepy entity) {
        log.info("Updating Storagepy entity: {}", entity);
        return repository.save(entity);
    }

    @Cacheable(value = "storagepyCache", key = "'count'")
    public long count() {
        log.debug("Counting Storagepy entities");
        return repository.count();
    }

    @Cacheable(value = "storagepyCache", key = "#name")
    public Optional<Storagepy> findByName(String name) {
        log.debug("Fetching Storagepy by name: {}", name);
        return repository.findByName(name);
    }
}