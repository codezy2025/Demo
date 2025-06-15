package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.Form4Service;
import com.java.coreTemplate.model.dto.Form4;

@RestController
@RequestMapping("/api/v1/form4")
public class Form4Controller {
    private final Form4Service service;
    
    public Form4Controller(Form4Service service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Form4> create(@RequestBody Form4 entity) {
        Form4 savedEntity = service.save(entity);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Form4> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Form4>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<Form4> forms = service.findAll(pageable);
        return ResponseEntity.ok(forms);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Form4> update(
            @PathVariable Long id, 
            @RequestBody Form4 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Form4 updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Form4> partialUpdate(
            @PathVariable Long id,
            @RequestBody Form4 partialEntity) {
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
    public ResponseEntity<Page<Form4>> search(
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Form4> results = service.search(keyword, pageable);
        return ResponseEntity.ok(results);
    }
}