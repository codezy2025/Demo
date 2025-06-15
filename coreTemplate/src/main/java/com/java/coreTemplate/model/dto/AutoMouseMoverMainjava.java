package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "automousemovermain")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AutoMouseMoverMainjava {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_name", nullable = false, length = 100)
    private String applicationName;

    @Column(name = "is_enabled")
    private boolean isEnabled;

    @Column(name = "move_interval_seconds")
    private Integer moveIntervalSeconds;

    @Column(name = "pixel_distance")
    private Integer pixelDistance;

    @Column(name = "last_activity_time")
    private Instant lastActivityTime;

    @Column(name = "is_random_movement")
    private boolean isRandomMovement;

    @Column(name = "preferred_screen_index")
    private Optional<Integer> preferredScreenIndex;

    @Version
    private Long version;
}