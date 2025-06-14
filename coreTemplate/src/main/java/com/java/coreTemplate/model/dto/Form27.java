package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "form27")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Form27 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(name = "amount", precision = 12, scale = 2)
    private Double amount;

    @Version
    private Long version;

    @Column(name = "metadata", columnDefinition = "TEXT")
    private String metadata;

    // Custom getter for optional completion date
    public Optional<LocalDateTime> getCompletionDate() {
        return Optional.ofNullable(completionDate);
    }

    // Custom getter for optional amount
    public Optional<Double> getAmount() {
        return Optional.ofNullable(amount);
    }
}