package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "reporting module (module3)")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReportingModuleModule3 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "module_name", nullable = false, length = 100)
    private String moduleName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt;

    @Column(name = "config_json", columnDefinition = "TEXT")
    private String configJson;

    @Version
    private Long version;

    // Custom getter for Optional fields
    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    public Optional<String> getConfigJson() {
        return Optional.ofNullable(configJson);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastModifiedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastModifiedAt = LocalDateTime.now();
    }
}