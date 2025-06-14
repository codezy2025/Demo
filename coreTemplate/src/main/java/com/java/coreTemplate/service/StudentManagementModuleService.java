package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.StudentManagementModuleRepository;
import com.java.coreTemplate.model.dto.StudentManagementModule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class StudentManagementModuleService {

    private final StudentManagementModuleRepository repository;

    public StudentManagementModuleService(StudentManagementModuleRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "students", allEntries = true)
    public StudentManagementModule save(StudentManagementModule entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "students", key = "#id")
    public Optional<StudentManagementModule> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("students")
    public List<StudentManagementModule> findAll() {
        return repository.findAll();
    }

    @Cacheable("students")
    public Page<StudentManagementModule> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable("activeStudents")
    public List<StudentManagementModule> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = {"students", "activeStudents"}, key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = {"students", "activeStudents"}, allEntries = true)
    public StudentManagementModule update(StudentManagementModule entity) {
        return repository.save(entity);
    }

    @Cacheable("students")
    public List<StudentManagementModule> findByLastName(String lastName) {
        return repository.findByLastNameContainingIgnoreCase(lastName);
    }

    @Cacheable("students")
    public List<StudentManagementModule> findByEmailDomain(String domain) {
        return repository.findByEmailEndingWith(domain);
    }
}