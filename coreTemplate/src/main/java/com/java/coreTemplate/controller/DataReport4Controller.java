package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.DataReport4Service;
import com.java.coreTemplate.model.dto.DataReport4;

@RestController
@RequestMapping("/api/v1/datareport4")
public class DataReport4Controller {
    private final DataReport4Service service;
    
    public DataReport4Controller(DataReport4Service service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<DataReport4> create(@RequestBody DataReport4 entity) {
        DataReport4 savedEntity = service.save(entity);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DataReport4> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<DataReport4>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DataReport4> update(
            @PathVariable Long id, 
            @RequestBody DataReport4 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<DataReport4> partialUpdate(
            @PathVariable Long id,
            @RequestBody DataReport4 partialEntity) {
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
    public ResponseEntity<Page<DataReport4>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}