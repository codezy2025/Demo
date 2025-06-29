package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.StoragepyService;
import com.java.coreTemplate.model.dto.Storagepy;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/storagepy")  // Changed from storage.py to storagepy for better URL compatibility
public class StoragepyController {
    private final StoragepyService service;

    public StoragepyController(StoragepyService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Storagepy> create(@RequestBody Storagepy entity) {
        Storagepy savedEntity = service.save(entity);
        return ResponseEntity.created(URI.create("/api/v1/storagepy/" + savedEntity.getId()))
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Storagepy> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Storagepy>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Storagepy> update(
            @PathVariable Long id, 
            @RequestBody Storagepy entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Storagepy> partialUpdate(
            @PathVariable Long id,
            @RequestBody Storagepy partialEntity) {
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
    public ResponseEntity<Page<Storagepy>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}