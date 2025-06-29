package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user interface module (form1.frm)_  
")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserInterfaceModuleForm1frm_ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "created_at", nullable = false)
    private java.time.Instant createdAt;

    @Column(name = "updated_at")
    private java.time.Instant updatedAt;

    @Column(name = "is_approved")
    private boolean isApproved;

    @Column(name = "priority")
    private Integer priority;

    @Version
    private Long version;
}