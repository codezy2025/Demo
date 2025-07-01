package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.UserInterfaceModuleForm1frm_Service;
import com.java.coreTemplate.model.dto.UserInterfaceModuleForm1frm_;

@RestController
@RequestMapping("/api/v1/user-interface-module-form1")
public class UserInterfaceModuleForm1frm_Controller {
    private final UserInterfaceModuleForm1frm_Service service;

    public UserInterfaceModuleForm1frm_Controller(UserInterfaceModuleForm1frm_Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UserInterfaceModuleForm1frm_> create(@RequestBody UserInterfaceModuleForm1frm_ entity) {
        UserInterfaceModuleForm1frm_ savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInterfaceModuleForm1frm_> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<UserInterfaceModuleForm1frm_>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<UserInterfaceModuleForm1frm_> page = service.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserInterfaceModuleForm1frm_> update(
            @PathVariable Long id, 
            @RequestBody UserInterfaceModuleForm1frm_ entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        UserInterfaceModuleForm1frm_ updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserInterfaceModuleForm1frm_> partialUpdate(
            @PathVariable Long id,
            @RequestBody UserInterfaceModuleForm1frm_ partialEntity) {
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
    public ResponseEntity<Page<UserInterfaceModuleForm1frm_>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserInterfaceModuleForm1frm_> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}