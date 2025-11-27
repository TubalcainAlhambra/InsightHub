package com.example.insighthub.insighthub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.insighthub.insighthub.model.proceso;

public interface proceso_repository extends MongoRepository<proceso, String> {
    
}
