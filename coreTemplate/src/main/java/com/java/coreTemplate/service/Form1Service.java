package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.Form1Repository;
import com.java.coreTemplate.model.dto.Form1;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class Form1Service {

    private final Form1Repository repository;

    public Form1Service(Form1Repository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "forms", allEntries = true)
    public Form1 save(Form1 entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "forms", key = "#id")
    public Optional<Form1> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "forms", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<Form1> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Form1> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "forms", key = "#id")
    public Form1 update(Long id, Form1 updatedForm) {
        return repository.findById(id)
                .map(existingForm -> {
                    // Update fields here
                    existingForm.setField1(updatedForm.getField1());
                    existingForm.setField2(updatedForm.getField2());
                    // Add other fields as needed
                    return repository.save(existingForm);
                })
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public List<Form1> searchByKeyword(String keyword) {
        return repository.findByField1ContainingIgnoreCaseOrField2ContainingIgnoreCase(keyword, keyword);
    }
}