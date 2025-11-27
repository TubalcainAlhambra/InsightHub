package com.example.insighthub.insighthub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class proceso {

    @Id
    private String id;
    private String name;
    private String type;
    private byte[] data;

    public proceso(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    // Getters y setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public byte[] getData() { return data; }

}
