package com.eco.map.controller;

import com.eco.map.model.Marker;
import com.eco.map.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/map")
@CrossOrigin("http://localhost:3000/")
public class MarkerController {

    private final MarkerService markerService;

    @Autowired
    public MarkerController(MarkerService markerService) {
        this.markerService = markerService;
    }

    @GetMapping("/markers")
    public List<Marker> markerList() {
        return markerService.findAll();
    }

}
