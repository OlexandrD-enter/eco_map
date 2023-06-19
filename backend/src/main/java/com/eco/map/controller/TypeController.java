package com.eco.map.controller;

import com.eco.map.model.Type;
import com.eco.map.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/map")
@CrossOrigin("http://localhost:3000/")
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping("/types")
    public List<Type> typeList() {
        return typeService.findAll();
    }
}
