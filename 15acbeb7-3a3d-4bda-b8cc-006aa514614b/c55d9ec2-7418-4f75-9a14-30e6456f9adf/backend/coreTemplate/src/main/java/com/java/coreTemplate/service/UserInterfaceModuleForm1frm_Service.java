package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.UserInterfaceModuleForm1frm_Repository;
import com.java.coreTemplate.model.dto.UserInterfaceModuleForm1frm_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserInterfaceModuleForm1frm_Service {

    private final UserInterfaceModuleForm1frm_Repository repository;

    public UserInterfaceModuleForm1frm_Service(UserInterfaceModuleForm1frm_Repository repository) {
        this.repository = repository;
    }

    @Transactional
    public UserInterfaceModuleForm1frm_ save(UserInterfaceModuleForm1frm_ entity) {
        return repository.save(entity);
    }

    @Transactional
    public List<UserInterfaceModuleForm1frm_> saveAll(List<UserInterfaceModuleForm1frm_> entities) {
        return repository.saveAll(entities);
    }

    public Optional<UserInterfaceModuleForm1frm_> findById(Long id) {
        return repository.findById(id);
    }

    public List<UserInterfaceModuleForm1frm_> findAll() {
        return repository.findAll();
    }

    public Page<UserInterfaceModuleForm1frm_> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public UserInterfaceModuleForm1frm_ update(UserInterfaceModuleForm1frm_ entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    // Custom query methods
    public List<UserInterfaceModuleForm1frm_> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public List<UserInterfaceModuleForm1frm_> findByCustomCriteria(String criteria) {
        return repository.findByCustomFieldContainingIgnoreCase(criteria);
    }
}