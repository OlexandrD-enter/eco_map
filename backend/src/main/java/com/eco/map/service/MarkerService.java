package com.eco.map.service;

import com.eco.map.model.Marker;
import com.eco.map.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkerService {
    private final MarkerRepository markerRepository;

    @Autowired
    public MarkerService(MarkerRepository markerRepository) {
        this.markerRepository = markerRepository;
    }

    public List<Marker> findAll() {
        return markerRepository.findAll();
    }

    public void deleteById(Long id) {
        markerRepository.deleteById(id);
    }

    public Marker save(Marker marker) {
        return markerRepository.save(marker);
    }
}
