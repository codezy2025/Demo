package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.StudentManagementModuleService;
import com.java.coreTemplate.model.dto.StudentManagementModule;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/students")
public class StudentManagementModuleController {
    private final StudentManagementModuleService service;

    public StudentManagementModuleController(StudentManagementModuleService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<StudentManagementModule> create(@Valid @RequestBody StudentManagementModule entity) {
        StudentManagementModule savedEntity = service.save(entity);
        return ResponseEntity
                .created(URI.create("/api/v1/students/" + savedEntity.getId()))
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentManagementModule> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<StudentManagementModule>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentManagementModule> update(
            @PathVariable Long id,
            @Valid @RequestBody StudentManagementModule entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StudentManagementModule> partialUpdate(
            @PathVariable Long id,
            @RequestBody StudentManagementModule partialEntity) {
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
    public ResponseEntity<Page<StudentManagementModule>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}