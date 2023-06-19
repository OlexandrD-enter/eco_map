package com.eco.map.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "marker")
public class Marker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float lat;
    private float lng;
    private String title;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    private Type type;
    @OneToMany(mappedBy = "marker", cascade = CascadeType.ALL)
    private Set<MarkerParameter> markerParameters;
}
