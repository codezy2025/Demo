package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.Form6Service;
import com.java.coreTemplate.model.dto.Form6;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/form6")
public class Form6Controller {
    private final Form6Service service;

    public Form6Controller(Form6Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Form6> create(@Valid @RequestBody Form6 entity) {
        Form6 savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form6> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Form6>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<Form6> forms = service.findAll(pageable);
        return ResponseEntity.ok(forms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Form6> update(
            @PathVariable Long id, 
            @Valid @RequestBody Form6 entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Form6 updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Form6> partialUpdate(
            @PathVariable Long id,
            @RequestBody Form6 partialEntity) {
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
    public ResponseEntity<Page<Form6>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Form6> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}