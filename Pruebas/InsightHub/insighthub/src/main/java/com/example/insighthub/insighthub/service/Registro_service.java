package com.example.insighthub.insighthub.service;

import com.example.insighthub.insighthub.model.Registro;
import com.example.insighthub.insighthub.repository.Registro_repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Registro_service {

    @Autowired
    private Registro_repository registroRepository;

    public Registro create(Registro registro) {
        return registroRepository.save(registro);
    }

    public List<Registro> readAll() {
        return registroRepository.findAll();
    }

    public Optional<Registro> readById(String id) {
        return registroRepository.findById(id);
    }

    public Registro update(String id, Registro registro) {
        registro.setId(id);
        return registroRepository.save(registro);
    }

    public void delete(String id) {
        registroRepository.deleteById(id);
    }

    public Optional<Registro> login(String correo, String contraseña) {
    Optional<Registro> user = registroRepository.findByCorreo(correo);

    if (user.isPresent() && user.get().getContraseña().equals(contraseña)) {
        return user;
    }

    return Optional.empty();
}

}
