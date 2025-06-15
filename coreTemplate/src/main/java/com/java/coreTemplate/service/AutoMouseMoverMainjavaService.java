package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.AutoMouseMoverMainjavaRepository;
import com.java.coreTemplate.model.dto.AutoMouseMoverMainjava;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class AutoMouseMoverMainjavaService {

    private final AutoMouseMoverMainjavaRepository repository;

    // Constructor injection (preferred over field injection)
    public AutoMouseMoverMainjavaService(AutoMouseMoverMainjavaRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public AutoMouseMoverMainjava save(AutoMouseMoverMainjava entity) {
        return repository.save(entity);
    }

    @Transactional
    public List<AutoMouseMoverMainjava> saveAll(List<AutoMouseMoverMainjava> entities) {
        return repository.saveAll(entities);
    }

    public Optional<AutoMouseMoverMainjava> findById(Long id) {
        return repository.findById(id);
    }

    public List<AutoMouseMoverMainjava> findAll() {
        return repository.findAll();
    }

    public Page<AutoMouseMoverMainjava> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<AutoMouseMoverMainjava> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public AutoMouseMoverMainjava update(Long id, AutoMouseMoverMainjava updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here as needed
                    // Example: existingEntity.setSomeField(updatedEntity.getSomeField());
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