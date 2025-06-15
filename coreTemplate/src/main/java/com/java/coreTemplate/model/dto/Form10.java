package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "form10")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Form10 {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "reference_code", nullable = false, unique = true, length = 50)
    private String referenceCode;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_approved")
    private boolean isApproved;

    @Column(name = "is_processed")
    private boolean isProcessed;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @Column(name = "priority_level", nullable = false)
    private Integer priorityLevel;

    @Version
    private Long version;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}