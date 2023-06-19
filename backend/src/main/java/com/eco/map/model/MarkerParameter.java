package com.eco.map.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "marker_parameter")
public class MarkerParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parameter_id")
    private Parameter parameter;

    @ManyToOne
    @JoinColumn(name = "marker_id")
    private Marker marker;

    private float value;

    private LocalDateTime dateAdded;
}
