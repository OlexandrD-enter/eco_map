package com.eco.map.repository;

import com.eco.map.model.MarkerParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerParameterRepository extends JpaRepository<MarkerParameter, Long> {
    @Query("SELECT mp FROM MarkerParameter mp " +
            "WHERE mp.marker.id = :markerId " +
            "AND mp.dateAdded = (SELECT MAX(mp2.dateAdded) " +
            "FROM MarkerParameter mp2 " +
            "WHERE mp2.marker.id = :markerId " +
            "AND mp2.parameter.id = mp.parameter.id)")
    List<MarkerParameter> findLastUniqueParamsByMarkerId(@Param("markerId") Long markerId);
}
