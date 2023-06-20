package com.eco.map.service;

import com.eco.map.model.Parameter;
import com.eco.map.repository.ParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParameterService {

    private final ParameterRepository parameterRepository;

    @Autowired
    public ParameterService(ParameterRepository parameterRepository){
        this.parameterRepository = parameterRepository;
    }

    public List<Parameter> findAll(){
        return parameterRepository.findAll();
    }

    public List<Parameter> findAllByType(Long typeId){
        return parameterRepository.findAllByTypeId(typeId);
    }
}
