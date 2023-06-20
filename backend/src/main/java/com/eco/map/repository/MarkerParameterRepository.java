package com.eco.map.repository;

import com.eco.map.model.MarkerParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkerParameterRepository extends JpaRepository<MarkerParameter, Long> {
}
