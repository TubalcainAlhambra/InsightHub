package com.example.insighthub.insighthub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reportes")
public class Reporte {

    @Id
    private String id;

    private String titulo;
    private String fecha;

    private String dagConsulta;
    private String dagEventosTexto;
    private String dagEventosImg;

    private String fechaSat;
    private String ganttMysql;

    private String falaserverProd;
    private String falaserverDev;
    private String faladata;

    private String horariosDags;
    private String condicionPipelines;

    public Reporte() {}

    // GETTERS y SETTERS
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getFecha() {
        return fecha;
    }
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    public String getDagConsulta() {
        return dagConsulta;
    }
    public void setDagConsulta(String dagConsulta) {
        this.dagConsulta = dagConsulta;
    }
    public String getDagEventosTexto() {
        return dagEventosTexto;
    }
    public void setDagEventosTexto(String dagEventosTexto) {
        this.dagEventosTexto = dagEventosTexto;
    }
    public String getDagEventosImg() {
        return dagEventosImg;
    }
    public void setDagEventosImg(String dagEventosImg) {
        this.dagEventosImg = dagEventosImg;
    }
    public String getFechaSat() {
        return fechaSat;
    }
    public void setFechaSat(String fechaSat) {
        this.fechaSat = fechaSat;
    }
    public String getGanttMysql() {
        return ganttMysql;
    }
    public void setGanttMysql(String ganttMysql) {
        this.ganttMysql = ganttMysql;
    }
    public String getFalaserverProd() {
        return falaserverProd;
    }
    public void setFalaserverProd(String falaserverProd) {
        this.falaserverProd = falaserverProd;
    }
    public String getFalaserverDev() {
        return falaserverDev;
    }
    public void setFalaserverDev(String falaserverDev) {
        this.falaserverDev = falaserverDev;
    }
    public String getFaladata() {
        return faladata;
    }
    public void setFaladata(String faladata) {
        this.faladata = faladata;
    }
    public String getHorariosDags() {
        return horariosDags;
    }
    public void setHorariosDags(String horariosDags) {
        this.horariosDags = horariosDags;
    }
    public String getCondicionPipelines() {
        return condicionPipelines;
    }
    public void setCondicionPipelines(String condicionPipelines) {
        this.condicionPipelines = condicionPipelines;
    }

}
