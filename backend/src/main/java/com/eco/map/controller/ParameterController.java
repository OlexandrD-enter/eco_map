package com.eco.map.controller;

import com.eco.map.model.Parameter;
import com.eco.map.service.ParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@CrossOrigin("http://localhost:3000/")
public class ParameterController {

    private final ParameterService parameterService;

    @Autowired
    public ParameterController(ParameterService parameterService) {
        this.parameterService = parameterService;
    }

    @GetMapping("/parameters")
    public List<Parameter> parameterList() {
        return parameterService.findAll();
    }

    @GetMapping("/parameters/{filter}")
    public List<Parameter> parameterListByType(@PathVariable Long filter) {
        return parameterService.findAllByType(filter);
    }
}
