package com.eco.map.controller;

import com.eco.map.model.Marker;
import com.eco.map.service.MarkerService;
import com.eco.map.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@CrossOrigin("http://localhost:3000/")
public class MarkerController {

    private final MarkerService markerService;
    private final TypeService typeService;

    @Autowired
    public MarkerController(MarkerService markerService, TypeService typeService) {
        this.markerService = markerService;
        this.typeService = typeService;
    }

    @GetMapping("/markers")
    public List<Marker> markerList() {
        return markerService.findAll();
    }

    @DeleteMapping("/markers/{id}")
    public void deleteById(@PathVariable Long id) {
        markerService.deleteById(id);
    }

    @PostMapping("/markers")
    public Marker save(@RequestBody Marker marker) {
        return markerService.save(marker);
    }

    @PostMapping("/markers/filter")
    public List<Marker> getMarkersWithFilter(@RequestBody List<String> filters){
        return markerService.findAllWithFilter(filters);
    }
}
