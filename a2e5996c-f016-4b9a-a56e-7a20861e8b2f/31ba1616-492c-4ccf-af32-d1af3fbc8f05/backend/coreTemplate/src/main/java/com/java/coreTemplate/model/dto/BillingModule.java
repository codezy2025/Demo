package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "billing_module")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BillingModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "module_name", nullable = false, length = 100)
    private String moduleName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_recurring")
    private boolean isRecurring;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "billing_cycle_days")
    private Integer billingCycleDays;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Version
    private Long version;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Custom getter for optional description
    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }
}