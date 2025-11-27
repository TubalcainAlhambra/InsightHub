package com.example.insighthub.insighthub.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.insighthub.insighthub.model.Registro;

// This interface extends MongoRepository to provide CRUD operations for the registro model
public interface Registro_repository extends MongoRepository<Registro, String>{

    Optional<Registro> findByCorreo(String correo);

}
