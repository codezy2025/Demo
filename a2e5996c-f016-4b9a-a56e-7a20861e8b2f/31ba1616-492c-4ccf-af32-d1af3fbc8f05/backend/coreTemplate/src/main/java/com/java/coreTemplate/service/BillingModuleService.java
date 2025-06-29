package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.BillingModuleRepository;
import com.java.coreTemplate.model.dto.BillingModule;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BillingModuleService {

    private final BillingModuleRepository repository;

    public BillingModuleService(BillingModuleRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "billingCache", allEntries = true)
    public BillingModule save(BillingModule entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "billingCache", key = "#id")
    public Optional<BillingModule> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "billingCache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<BillingModule> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<BillingModule> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "billingCache", key = "#customerId")
    public List<BillingModule> findByCustomerId(String customerId) {
        return repository.findByCustomerId(customerId);
    }

    @Transactional
    @CacheEvict(value = "billingCache", key = "#id")
    public BillingModule updateStatus(Long id, boolean isActive) {
        return repository.findById(id)
                .map(billing -> {
                    billing.setActive(isActive);
                    return repository.save(billing);
                })
                .orElseThrow(() -> new RuntimeException("Billing record not found"));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}