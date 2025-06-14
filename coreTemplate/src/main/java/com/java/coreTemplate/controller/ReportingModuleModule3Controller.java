package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.ReportingModuleModule3Service;
import com.java.coreTemplate.model.dto.ReportingModuleModule3;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/reporting-module/module3")
public class ReportingModuleModule3Controller {
    private final ReportingModuleModule3Service service;
    
    public ReportingModuleModule3Controller(ReportingModuleModule3Service service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<ReportingModuleModule3> create(@Valid @RequestBody ReportingModuleModule3 entity) {
        ReportingModuleModule3 savedEntity = service.save(entity);
        return ResponseEntity.created(URI.create("/api/v1/reporting-module/module3/" + savedEntity.getId()))
                .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ReportingModuleModule3> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<ReportingModuleModule3>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ReportingModuleModule3> update(
            @PathVariable Long id, 
            @Valid @RequestBody ReportingModuleModule3 entity) {
        return service.update(id, entity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<ReportingModuleModule3>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}