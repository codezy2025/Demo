package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.Form27Service;
import com.java.coreTemplate.model.dto.Form27;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/form27")
public class Form27Controller {
    private final Form27Service service;
    
    public Form27Controller(Form27Service service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Form27> create(@Valid @RequestBody Form27 entity) {
        Form27 savedEntity = service.save(entity);
        return ResponseEntity.created(URI.create("/api/v1/form27/" + savedEntity.getId()))
                .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Form27> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Form27>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Form27> update(
            @PathVariable Long id, 
            @Valid @RequestBody Form27 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Form27> partialUpdate(
            @PathVariable Long id,
            @RequestBody Form27 partialEntity) {
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
    public ResponseEntity<Page<Form27>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}