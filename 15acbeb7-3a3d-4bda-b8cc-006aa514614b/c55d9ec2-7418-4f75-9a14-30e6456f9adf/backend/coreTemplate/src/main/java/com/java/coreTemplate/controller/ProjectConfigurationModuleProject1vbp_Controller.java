package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.ProjectConfigurationModuleProject1vbp_Service;
import com.java.coreTemplate.model.dto.ProjectConfigurationModuleProject1vbp_;

@RestController
@RequestMapping("/api/v1/project-configurations")
public class ProjectConfigurationModuleProject1vbp_Controller {
    
    private final ProjectConfigurationModuleProject1vbp_Service service;

    public ProjectConfigurationModuleProject1vbp_Controller(ProjectConfigurationModuleProject1vbp_Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProjectConfigurationModuleProject1vbp_> create(
            @RequestBody ProjectConfigurationModuleProject1vbp_ entity) {
        ProjectConfigurationModuleProject1vbp_ savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectConfigurationModuleProject1vbp_> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<ProjectConfigurationModuleProject1vbp_>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<ProjectConfigurationModuleProject1vbp_> configurations = service.findAll(pageable);
        return ResponseEntity.ok(configurations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectConfigurationModuleProject1vbp_> update(
            @PathVariable Long id,
            @RequestBody ProjectConfigurationModuleProject1vbp_ entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        ProjectConfigurationModuleProject1vbp_ updatedEntity = service.save(entity);
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
    public ResponseEntity<Page<ProjectConfigurationModuleProject1vbp_>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ProjectConfigurationModuleProject1vbp_> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}