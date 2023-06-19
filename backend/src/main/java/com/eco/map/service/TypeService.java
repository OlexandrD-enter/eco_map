package com.eco.map.service;

import com.eco.map.model.Type;
import com.eco.map.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TypeService {
    private final TypeRepository typeRepository;

    @Autowired
    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public List<Type> findAll(){
        return typeRepository.findAll();
    }

    public Type findById(Long id){
        return typeRepository.findById(id).orElseThrow(()-> new NoSuchElementException("No type with id: " + id));
    }
}
