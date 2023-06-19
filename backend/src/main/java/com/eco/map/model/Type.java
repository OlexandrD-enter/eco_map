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
@Table(name = "type")
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
    private Set<Marker> markers;
}
