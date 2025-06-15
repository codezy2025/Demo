package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form27Repository;
import com.java.coreTemplate.model.dto.Form27;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class Form27Service {

    private final Form27Repository repository;

    public Form27Service(Form27Repository repository) {
        this.repository = repository;
    }

    @Transactional
    public Form27 save(Form27 entity) {
        return repository.save(entity);
    }

    @Transactional
    public List<Form27> saveAll(List<Form27> entities) {
        return repository.saveAll(entities);
    }

    public Optional<Form27> findById(Long id) {
        return repository.findById(id);
    }

    public List<Form27> findAll() {
        return repository.findAll();
    }

    public Page<Form27> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Form27> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void delete(Form27 entity) {
        repository.delete(entity);
    }

    @Transactional
    public Form27 update(Form27 entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }
}