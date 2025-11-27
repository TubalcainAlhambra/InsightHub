package com.example.insighthub.insighthub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.insighthub.insighthub.model.Reporte;
import com.example.insighthub.insighthub.repository.ReporteRepository;

@Service
public class ReporteService {

    private final ReporteRepository repo;

    public ReporteService(ReporteRepository repo) {
        this.repo = repo;
    }

    public Reporte save(Reporte r) {
        return repo.save(r);
    }

    public List<Reporte> listAll() {
        return repo.findAll();
    }

    public Reporte getById(String id) {
        return repo.findById(id).orElse(null);
    }
}
