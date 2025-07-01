package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.MainSystemModuleService;
import com.java.coreTemplate.model.dto.MainSystemModule;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/main-system-modules")  // Using hyphens instead of spaces
public class MainSystemModuleController {
    private final MainSystemModuleService service;

    public MainSystemModuleController(MainSystemModuleService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MainSystemModule> create(@Valid @RequestBody MainSystemModule entity) {
        MainSystemModule savedEntity = service.save(entity);
        return ResponseEntity
                .created(URI.create("/api/v1/main-system-modules/" + savedEntity.getId()))
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MainSystemModule> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<MainSystemModule>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MainSystemModule> update(
            @PathVariable Long id, 
            @Valid @RequestBody MainSystemModule entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MainSystemModule> partialUpdate(
            @PathVariable Long id,
            @RequestBody MainSystemModule partialEntity) {
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
    public ResponseEntity<Page<MainSystemModule>> search(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.searchByName(name, pageable));
    }
}