package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Module1Repository;
import com.java.coreTemplate.model.dto.Module1;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class Module1Service {
    private final Module1Repository repository;

    public Module1Service(Module1Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "module1Cache", allEntries = true)
    public Module1 save(Module1 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "module1Cache", key = "#id")
    public Optional<Module1> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "module1Cache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<Module1> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Module1> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "module1Cache", key = "'allActive'")
    public List<Module1> findAllActiveCached() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "module1Cache", key = "#id")
    public Module1 update(Long id, Module1 updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new EntityNotFoundException("Module1 not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}