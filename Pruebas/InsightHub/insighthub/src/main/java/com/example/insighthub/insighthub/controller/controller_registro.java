package com.example.insighthub.insighthub.controller;

import com.example.insighthub.insighthub.model.Registro;
import com.example.insighthub.insighthub.service.Registro_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// This controller handles HTTP requests related to the registro model
// It uses the registro_service to perform CRUD operations
// The @RestController annotation indicates that this class is a RESTful controller
// The @RequestMapping annotation specifies the base URL for this controller
// The @CrossOrigin annotation allows cross-origin requests, which is useful for frontend-backend communication
// The @Controller annotation is used to define a controller in Spring MVC
@RestController
@RequestMapping("/api/Registro")
@CrossOrigin("*")
public class controller_registro {

    // Autowired annotation is used to inject the registro_service dependency
    // This allows the controller to use the service methods to handle requests
     @Autowired
    private Registro_service registroService;

    // The following methods handle HTTP requests for the registro model
    @PostMapping
    public Registro crearRegistro(@RequestBody Registro registro) {
        System.out.println("Registro recibido: " + registro.getNombre());
        return registroService.create(registro);
    }

    @PostMapping("/login")
    public Optional<Registro> login(@RequestBody Registro datos) {
        return registroService.login(datos.getCorreo(), datos.getContraseña());
    }

    // The @GetMapping annotation is used to handle GET requests
    // The @PathVariable annotation is used to extract the id from the URL
    @GetMapping
    public List<Registro> obtenerTodos() {
        return registroService.readAll();
    }

    // The @GetMapping annotation with a path variable is used to handle requests for a specific registro by id
    // The @PathVariable annotation binds the id from the URL to the method parameter
    @GetMapping("/{id}")
    public Optional<Registro> obtenerPorId(@PathVariable String id) {
        return registroService.readById(id);
    }

    // The @PutMapping annotation is used to handle PUT requests for updating a registro
    // The @RequestBody annotation binds the request body to the registro parameter
    @PutMapping("/{id}")
    public Registro actualizar(@PathVariable String id, @RequestBody Registro registro) {
        return registroService.update(id, registro);
    }

    // The @DeleteMapping annotation is used to handle DELETE requests for deleting a registro by id
    // The @PathVariable annotation binds the id from the URL to the method parameter
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        registroService.delete(id);
    }

}
