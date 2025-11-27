package com.example.insighthub.insighthub.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.insighthub.insighthub.model.Reporte;
import com.example.insighthub.insighthub.service.ReporteService;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "http://localhost:5173")
public class ReporteController {

    private final ReporteService service;

    public ReporteController(ReporteService service) {
        this.service = service;
    }

    @PostMapping
    public Reporte save(@RequestBody Reporte reporte) {
        return service.save(reporte);
    }

    @GetMapping
    public List<Reporte> list() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public Reporte getById(@PathVariable String id) {
        return service.getById(id);
    }
}
