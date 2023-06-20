package com.eco.map.service;

import com.eco.map.model.MarkerParameter;
import com.eco.map.repository.MarkerParameterRepository;
import com.eco.map.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkerParameterService {

    private final MarkerParameterRepository markerParameterRepository;

    @Autowired
    public MarkerParameterService(MarkerParameterRepository markerParameterRepository){
        this.markerParameterRepository = markerParameterRepository;
    }

    public List<MarkerParameter> saveAll(List<MarkerParameter> markerParameters){
        return markerParameterRepository.saveAll(markerParameters);
    }
}
