package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "form4")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Form4 {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "form_name", nullable = false, length = 120)
    private String formName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_approved")
    private boolean isApproved;

    @Column(name = "is_completed")
    private boolean isCompleted;

    @Column(name = "submission_date", nullable = false)
    private Instant submissionDate;

    @Column(name = "expiration_date")
    private Instant expirationDate;

    @Column(name = "priority_level")
    private Integer priorityLevel;

    @Version
    private Long version;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }
}