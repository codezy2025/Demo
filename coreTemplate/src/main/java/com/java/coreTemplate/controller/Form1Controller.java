package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.Form1Service;
import com.java.coreTemplate.model.dto.Form1;

@RestController
@RequestMapping("/api/v1/form1")
public class Form1Controller {
    private final Form1Service service;

    public Form1Controller(Form1Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Form1> create(@RequestBody Form1 entity) {
        Form1 savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form1> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Form1>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<Form1> forms = service.findAll(pageable);
        return ResponseEntity.ok(forms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Form1> update(
            @PathVariable Long id, 
            @RequestBody Form1 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Form1 updatedEntity = service.save(entity);
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
    public ResponseEntity<Page<Form1>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Form1> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}