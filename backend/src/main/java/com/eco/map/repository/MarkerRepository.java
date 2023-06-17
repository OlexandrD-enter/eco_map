package com.eco.map.repository;

import com.eco.map.model.Marker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarkerRepository extends JpaRepository<Marker, Long> {

}
