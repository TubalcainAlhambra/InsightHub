import React, { useState } from "react";
import "./index.css";

export interface ReportCardProps {
  title: string;
  date: string;
  text: string;
  images: string[];
}

const ReportCard: React.FC<ReportCardProps> = ({ title, date, text, images }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`report-card ${open ? "open" : ""}`}>
      {/* Encabezado */}
      <div className="report-header" onClick={() => setOpen(!open)}>
        <span className={`arrow ${open ? "open" : ""}`}>▼</span>
        <div>
          <h3>{title}</h3>
          <p className="date">{date}</p>
        </div>
      </div>

      {/* Contenido expandible */}
      <div className="report-content">
        <p>{text}</p>

        {/* Imágenes */}
        <div className="images-container">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagen ${index}`}
              className="report-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
