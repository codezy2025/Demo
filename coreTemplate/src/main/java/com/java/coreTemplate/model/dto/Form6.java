package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "form6")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Form6 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_code", nullable = false, unique = true, length = 50)
    private String referenceCode;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_approved")
    private boolean isApproved;

    @Column(name = "is_completed")
    private boolean isCompleted;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @Column(name = "priority_level")
    private Integer priorityLevel;

    @Version
    private Long version;

    // Custom getter for Optional completion date
    public Optional<LocalDateTime> getCompletionDate() {
        return Optional.ofNullable(completionDate);
    }
}