package com.example.insighthub.insighthub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.insighthub.insighthub.model.Reporte;

public interface ReporteRepository extends MongoRepository<Reporte, String> {
}
