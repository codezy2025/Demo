package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.Module1Service;
import com.java.coreTemplate.model.dto.Module1;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/module1")
public class Module1Controller {
    private final Module1Service service;

    public Module1Controller(Module1Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Module1> create(@Valid @RequestBody Module1 entity) {
        Module1 savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/module1/" + savedEntity.getId())
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Module1> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Module1>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Module1> update(
            @PathVariable Long id, 
            @Valid @RequestBody Module1 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Module1> partialUpdate(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {
        return service.partialUpdate(id, updates)
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
    public ResponseEntity<Page<Module1>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}