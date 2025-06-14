package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "datareport4")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DataReport4 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_name", nullable = false, length = 255)
    private String reportName;

    @Column(name = "generation_date", nullable = false)
    private Instant generationDate;

    @Column(name = "is_approved")
    private boolean isApproved;

    @Column(name = "is_processed")
    private boolean isProcessed;

    @Column(name = "file_size_bytes")
    private Optional<Long> fileSizeBytes;

    @Column(name = "report_type", length = 50)
    private String reportType;

    @Column(name = "metadata", columnDefinition = "TEXT")
    private String metadata;

    @Version
    private Long version;

    // Custom getter for Optional field to ensure proper null handling
    public Optional<Long> getFileSizeBytes() {
        return Optional.ofNullable(fileSizeBytes).orElse(Optional.empty());
    }
}