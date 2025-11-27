package com.example.insighthub.insighthub.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.insighthub.insighthub.model.proceso;
import com.example.insighthub.insighthub.service.proceso_service;


@RestController
@RequestMapping("/api/images")

public class controller_proceso {

    private final proceso_service procesoService;
    
    public controller_proceso(proceso_service procesoService) {
        this.procesoService = procesoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        proceso proceso = procesoService.saveImage(file);
        return ResponseEntity.ok(proceso.getId());
    }

    @GetMapping("/{id}")
public ResponseEntity<byte[]> getImage(@PathVariable String id) {
    return procesoService.getImage(id)
            .map(img -> ResponseEntity
                .ok()
                .header("Content-Type", img.getType())  // ej: image/png
                .body(img.getData()))                   // bytes puros
            .orElse(ResponseEntity.notFound().build());
}

}
