package com.eco.map.controller;

import com.eco.map.model.MarkerParameter;
import com.eco.map.service.MarkerParameterService;
import com.eco.map.service.ParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@CrossOrigin("http://localhost:3000/")
public class MarkerParameterController {

    private final MarkerParameterService markerParameterService;

    @Autowired
    public MarkerParameterController(MarkerParameterService markerParameterService) {
        this.markerParameterService = markerParameterService;
    }

    @PostMapping("/marker_parameters")
    public List<MarkerParameter> saveAll(@RequestBody List<MarkerParameter> markerParameterList) {
        System.out.println(markerParameterList);
        return markerParameterService.saveAll(markerParameterList);
    }
}
