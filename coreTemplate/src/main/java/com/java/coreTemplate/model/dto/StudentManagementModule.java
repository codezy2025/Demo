package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Optional;

@Entity
@Table(name = "student_management_module")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StudentManagementModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name", nullable = false, length = 100)
    private String studentName;

    @Column(name = "email", unique = true, length = 100)
    private String email;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;

    @Column(name = "graduation_date")
    private LocalDate graduationDate;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_graduated")
    private boolean isGraduated;

    @Column(name = "gpa", precision = 3, scale = 2)
    private Double gpa;

    @Column(name = "major", length = 50)
    private String major;

    @Column(name = "minor", length = 50)
    private String minor;

    @Version
    private Long version;

    // Custom getter for Optional field
    public Optional<LocalDate> getGraduationDate() {
        return Optional.ofNullable(graduationDate);
    }

    // Custom getter for Optional field
    public Optional<Double> getGpa() {
        return Optional.ofNullable(gpa);
    }
}