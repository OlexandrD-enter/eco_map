package com.eco.map.repository;

import com.eco.map.model.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {
    @Query("SELECT m FROM Marker m " +
            "LEFT JOIN m.markerParameters mp " +
            "LEFT JOIN mp.parameter p " +
            "WHERE p.name IN :parameterNames")
    List<Marker> findAllMarkers(@Param("parameterNames") List<String> parameterNames);
}
