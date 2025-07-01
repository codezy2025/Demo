package com.java.coreTemplate.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.java.coreTemplate.service.ValidatorpyService;
import com.java.coreTemplate.model.dto.Validatorpy;

@RestController
@RequestMapping("/api/v1/validators")
public class ValidatorpyController {
    private final ValidatorpyService service;

    public ValidatorpyController(ValidatorpyService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Validatorpy> create(@RequestBody Validatorpy entity) {
        Validatorpy savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/validators/" + savedEntity.getId())
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Validatorpy> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Validatorpy>> getAll(Pageable pageable) {
        Page<Validatorpy> validators = service.findAll(pageable);
        return ResponseEntity.ok(validators);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Validatorpy> update(@PathVariable Long id, @RequestBody Validatorpy entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Validatorpy> partialUpdate(@PathVariable Long id, @RequestBody Validatorpy partialEntity) {
        return service.findById(id)
                .map(existing -> {
                    if (partialEntity.getProperty1() != null) {
                        existing.setProperty1(partialEntity.getProperty1());
                    }
                    // Add other properties as needed
                    return ResponseEntity.ok(service.save(existing));
                })
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
    public ResponseEntity<Page<Validatorpy>> search(
            @RequestParam(required = false) String query,
            Pageable pageable) {
        Page<Validatorpy> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}