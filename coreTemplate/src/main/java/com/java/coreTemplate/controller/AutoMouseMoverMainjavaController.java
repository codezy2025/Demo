package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.AutoMouseMoverMainjavaService;
import com.java.coreTemplate.model.dto.AutoMouseMoverMainjava;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auto-mouse-movers")
@Tag(name = "Auto Mouse Mover", description = "API for managing automatic mouse movement configurations")
public class AutoMouseMoverMainjavaController {
    
    private final AutoMouseMoverMainjavaService service;

    public AutoMouseMoverMainjavaController(AutoMouseMoverMainjavaService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Create a new auto mouse mover configuration",
               responses = {
                   @ApiResponse(responseCode = "201", description = "Configuration created successfully"),
                   @ApiResponse(responseCode = "400", description = "Invalid input")
               })
    public ResponseEntity<AutoMouseMoverMainjava> create(
            @Valid @RequestBody AutoMouseMoverMainjava entity) {
        AutoMouseMoverMainjava savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get auto mouse mover configuration by ID",
               responses = {
                   @ApiResponse(responseCode = "200", description = "Configuration found"),
                   @ApiResponse(responseCode = "404", description = "Configuration not found")
               })
    public ResponseEntity<AutoMouseMoverMainjava> getById(
            @Parameter(description = "ID of the configuration to retrieve") 
            @PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    @Operation(summary = "Get all auto mouse mover configurations with pagination",
               responses = {
                   @ApiResponse(responseCode = "200", description = "Successfully retrieved configurations")
               })
    public ResponseEntity<Page<AutoMouseMoverMainjava>> getAll(
            @Parameter(hidden = true) 
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing auto mouse mover configuration",
               responses = {
                   @ApiResponse(responseCode = "200", description = "Configuration updated successfully"),
                   @ApiResponse(responseCode = "400", description = "Invalid input"),
                   @ApiResponse(responseCode = "404", description = "Configuration not found")
               })
    public ResponseEntity<AutoMouseMoverMainjava> update(
            @Parameter(description = "ID of the configuration to update") 
            @PathVariable Long id,
            @Valid @RequestBody AutoMouseMoverMainjava entity) {
        return ResponseEntity.ok(service.update(id, entity));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an auto mouse mover configuration",
               responses = {
                   @ApiResponse(responseCode = "204", description = "Configuration deleted successfully"),
                   @ApiResponse(responseCode = "404", description = "Configuration not found")
               })
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID of the configuration to delete") 
            @PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search configurations with pagination",
               responses = {
                   @ApiResponse(responseCode = "200", description = "Successfully retrieved matching configurations")
               })
    public ResponseEntity<Page<AutoMouseMoverMainjava>> search(
            @Parameter(description = "Search query") 
            @RequestParam(required = false) String query,
            @Parameter(hidden = true) 
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}