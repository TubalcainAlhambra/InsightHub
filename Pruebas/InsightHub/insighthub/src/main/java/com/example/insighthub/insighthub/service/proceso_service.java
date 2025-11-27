package com.example.insighthub.insighthub.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.insighthub.insighthub.model.proceso;
import com.example.insighthub.insighthub.repository.proceso_repository;

@Service
public class proceso_service {


    private final proceso_repository procesoRepository;
    
    public proceso_service(proceso_repository procesoRepository) {
        this.procesoRepository = procesoRepository;
    }

    public proceso saveImage(MultipartFile file) throws IOException {
        proceso proceso = new proceso(file.getOriginalFilename(), file.getContentType(), file.getBytes());
        return procesoRepository.save(proceso);
    }

    public Optional<proceso> getImage(String id) {
        return procesoRepository.findById(id);
    }

}
