package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form12Repository;
import com.java.coreTemplate.model.dto.Form12;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class Form12Service {

    private final Form12Repository repository;

    @Transactional
    public Form12 save(Form12 entity) {
        log.debug("Saving Form12 entity: {}", entity);
        return repository.save(entity);
    }

    public Optional<Form12> findById(Long id) {
        log.debug("Finding Form12 by id: {}", id);
        return repository.findById(id);
    }

    public List<Form12> findAll() {
        log.debug("Finding all Form12 entities");
        return repository.findAll();
    }

    public Page<Form12> findAll(Pageable pageable) {
        log.debug("Finding all Form12 entities with pagination: {}", pageable);
        return repository.findAll(pageable);
    }

    @Transactional
    public void deleteById(Long id) {
        log.debug("Deleting Form12 by id: {}", id);
        repository.deleteById(id);
    }

    public List<Form12> findAllActive() {
        log.debug("Finding all active Form12 entities");
        return repository.findByIsActiveTrue();
    }

    @Transactional
    public Form12 update(Long id, Form12 updatedEntity) {
        log.debug("Updating Form12 with id: {}", id);
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here as needed
                    // existingEntity.setField1(updatedEntity.getField1());
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new EntityNotFoundException("Form12 not found with id: " + id));
    }

    public boolean existsById(Long id) {
        log.debug("Checking if Form12 exists with id: {}", id);
        return repository.existsById(id);
    }
}