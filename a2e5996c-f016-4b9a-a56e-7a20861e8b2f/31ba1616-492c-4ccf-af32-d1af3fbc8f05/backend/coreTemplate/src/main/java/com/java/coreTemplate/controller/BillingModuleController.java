package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.BillingModuleService;
import com.java.coreTemplate.model.dto.BillingModule;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/billing-modules")  // Changed to use hyphens instead of spaces
public class BillingModuleController {
    private final BillingModuleService service;

    public BillingModuleController(BillingModuleService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BillingModule> create(@Valid @RequestBody BillingModule entity) {
        BillingModule savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillingModule> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<BillingModule>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<BillingModule> billingModules = service.findAll(pageable);
        return ResponseEntity.ok(billingModules);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BillingModule> update(
            @PathVariable Long id, 
            @Valid @RequestBody BillingModule entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        BillingModule updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BillingModule> partialUpdate(
            @PathVariable Long id,
            @RequestBody BillingModule partialEntity) {
        return service.partialUpdate(id, partialEntity)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<BillingModule>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<BillingModule> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}