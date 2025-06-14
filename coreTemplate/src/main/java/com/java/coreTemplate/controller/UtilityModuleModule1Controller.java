package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.UtilityModuleModule1Service;
import com.java.coreTemplate.model.dto.UtilityModuleModule1;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/utility-modules/module1")
public class UtilityModuleModule1Controller {
    
    private final UtilityModuleModule1Service service;
    
    public UtilityModuleModule1Controller(UtilityModuleModule1Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UtilityModuleModule1> create(@Valid @RequestBody UtilityModuleModule1 entity) {
        UtilityModuleModule1 savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilityModuleModule1> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<UtilityModuleModule1>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<UtilityModuleModule1> page = service.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilityModuleModule1> update(
            @PathVariable Long id, 
            @Valid @RequestBody UtilityModuleModule1 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure ID matches path variable
        UtilityModuleModule1 updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UtilityModuleModule1> partialUpdate(
            @PathVariable Long id,
            @RequestBody UtilityModuleModule1 partialEntity) {
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
    public ResponseEntity<Page<UtilityModuleModule1>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UtilityModuleModule1> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}