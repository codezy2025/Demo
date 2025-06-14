package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Module2Repository;
import com.java.coreTemplate.model.dto.Module2;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class Module2Service {

    private final Module2Repository repository;

    @Transactional
    @CacheEvict(value = "module2Cache", allEntries = true)
    public Module2 save(Module2 entity) {
        log.info("Saving new Module2 entity: {}", entity);
        return repository.save(entity);
    }

    @Cacheable(value = "module2Cache", key = "#id")
    public Optional<Module2> findById(Long id) {
        log.info("Fetching Module2 with id: {}", id);
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "module2Cache", key = "#id")
    public void deleteById(Long id) {
        log.info("Deleting Module2 with id: {}", id);
        repository.deleteById(id);
    }

    public List<Module2> findAll() {
        log.info("Fetching all Module2 entities");
        return repository.findAll();
    }

    public Page<Module2> findAll(Pageable pageable) {
        log.info("Fetching all Module2 entities with pagination: {}", pageable);
        return repository.findAll(pageable);
    }

    public List<Module2> findAllActive() {
        log.info("Fetching all active Module2 entities");
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "module2Cache", key = "#id")
    public Module2 update(Long id, Module2 updatedEntity) {
        log.info("Updating Module2 with id: {}", id);
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    // existingEntity.setField(updatedEntity.getField());
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new RuntimeException("Module2 not found with id: " + id));
    }

    public boolean existsById(Long id) {
        log.info("Checking if Module2 exists with id: {}", id);
        return repository.existsById(id);
    }
}