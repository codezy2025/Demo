package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "utility module (module1)")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UtilityModuleModule1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "configuration_json", columnDefinition = "TEXT")
    private String configurationJson;

    @Version
    private Long version;

    // Custom getter for Optional description
    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    // Custom getter for Optional configurationJson
    public Optional<String> getConfigurationJson() {
        return Optional.ofNullable(configurationJson);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}