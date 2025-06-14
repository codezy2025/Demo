package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import com.java.coreTemplate.service.DatabaseModuleModule2Service;
import com.java.coreTemplate.model.dto.DatabaseModuleModule2;

@RestController
@RequestMapping("/api/v1/database-module-module2")
public class DatabaseModuleModule2Controller {
    private final DatabaseModuleModule2Service service;

    public DatabaseModuleModule2Controller(DatabaseModuleModule2Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DatabaseModuleModule2> create(@RequestBody DatabaseModuleModule2 entity) {
        DatabaseModuleModule2 savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatabaseModuleModule2> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<DatabaseModuleModule2>> getAll(Pageable pageable) {
        Page<DatabaseModuleModule2> page = service.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DatabaseModuleModule2> update(
            @PathVariable Long id, 
            @RequestBody DatabaseModuleModule2 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        DatabaseModuleModule2 updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
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
    public ResponseEntity<Page<DatabaseModuleModule2>> search(
            @RequestParam(required = false) String query,
            Pageable pageable) {
        Page<DatabaseModuleModule2> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}