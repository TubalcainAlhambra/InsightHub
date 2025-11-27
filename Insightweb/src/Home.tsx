import "./index.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Reporte {
  id?: string;
  titulo: string;
  fecha: string;
  dagConsulta?: string;
  dagEventosTexto?: string;
  dagEventosImg?: string;
  fechaSat?: string;
  ganttMysql?: string;
  falaserverProd?: string;
  falaserverDev?: string;
  faladata?: string;
  horariosDags?: string;
  condicionPipelines?: string;
}

export default function App() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [reporteActual, setReporteActual] = useState<Reporte | null>(null);

  const [formData, setFormData] = useState<Reporte>({
    titulo: "",
    fecha: new Date().toLocaleDateString(),
  });

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // limpia el AuthContext
        localStorage.removeItem("usuario"); // elimina sesión persistida

    navigate("/login"); // redirige al login
    };

  // Carga reportes desde el backend
  const cargarReportes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reportes");
      setReportes(res.data);
    } catch (err) {
      console.error("Error cargando reportes:", err);
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  // Subir imagen y obtener ID
  const subirImagen = async (archivo: File) => {
    const data = new FormData();
    data.append("file", archivo);

    const res = await axios.post(
      "http://localhost:8080/api/images/upload",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data;
  };

  // Guardar reporte en MongoDB
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/reportes", formData);

      setFormData({
        titulo: "",
        fecha: new Date().toLocaleDateString(),
      });

      setMostrarModal(false);

      cargarReportes(); // recargar
    } catch (err) {
      console.error("Error guardando reporte:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        InsightHub - Panel de Alertas
      </h1>

      {/* Lista de reportes */}
      <div className="grid gap-4">
        {reportes.map((rep) => (
          <div
            key={rep.id}
            onClick={() => setReporteActual(rep)}
            className="p-4 bg-white shadow-md rounded-xl cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg text-gray-600 mb-4">{rep.titulo}</h2>
            <p className="text-gray-600 text-sm">Fecha: {rep.fecha}</p>
          </div>
        ))}
      </div>

      {/* Botón circular flotante */}
      <button
        onClick={() => setMostrarModal(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={handleLogout}
        className="fixed bottom-24 right-8 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-red-700 transition"
      >
        ⏻
      </button>


      {/* Modal de formulario */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Nuevo Reporte
            </h2>

            <form onSubmit={manejarEnvio} className="space-y-4">
              <input
                type="text"
                placeholder="Título o encabezado"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                required
                className="w-full border rounded-lg p-2"
              />

              <p>
                Buen día, el día de hoy {formData.fecha} se comunicarán los
                siguientes alertas:
              </p>

              {/* ------------------- IMÁGENES ------------------- */}

              <p>Tabla de alertas:</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, dagConsulta: imageId });
                }}
              />

              <p>Eventos en los Dag's (imagen):</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, dagEventosImg: imageId });
                }}
              />

              <textarea
                placeholder="Descripción de eventos..."
                onChange={(e) =>
                  setFormData({ ...formData, dagEventosTexto: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />

              <p>Fecha de llegada del primer archivo de SAT:</p>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, fechaSat: e.target.value })
                }
                className="w-full border rounded-lg p-2 text-black"
              />

              <p>Gantt de MySQL ingest:</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, ganttMysql: imageId });
                }}
              />

              <p>Falaserver Prod:</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, falaserverProd: imageId });
                }}
              />

              <p>Falaserver Desarrollo:</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, falaserverDev: imageId });
                }}
              />

              <p>Faladata:</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, faladata: imageId });
                }}
              />

              <p>Horarios Dags:</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-500 bg-[#007858] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"
                onChange={async (e) => {
                  const archivo = e.target.files?.[0];
                  if (!archivo) return;

                  const imageId = await subirImagen(archivo);
                  setFormData({ ...formData, horariosDags: imageId });
                }}
              />

              <p>Condición de Pipelines:</p>
              <textarea
                placeholder="Condición general..."
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    condicionPipelines: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2 text-black"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition w-full mt-2"
              >
                Enviar
              </button>
            </form>

            <button
              onClick={() => setMostrarModal(false)}
              className="mt-3 text-red-500 w-full underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ------------------- DETALLE DEL REPORTE ------------------- */}
      {reporteActual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[700px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2 text-center text-black">
              {reporteActual.titulo}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Fecha: {reporteActual.fecha}
            </p>

            <div className="space-y-3">

  <p><strong className='text-black'>Tabla de alertas:</strong></p>
  {reporteActual.dagConsulta && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.dagConsulta}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  <p><strong className='text-black'>Eventos en los Dag's:</strong></p>
  {reporteActual.dagEventosImg && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.dagEventosImg}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  {reporteActual.dagEventosTexto && (
    <p>{reporteActual.dagEventosTexto}</p>
  )}

  {reporteActual.fechaSat && (
    <p><strong className='text-black'>Fecha de llegada archivos SAT:</strong> {reporteActual.fechaSat}</p>
  )}

  <p><strong className='text-black'>Gantt de MySQL_ingest:</strong></p>
  {reporteActual.ganttMysql && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.ganttMysql}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  <p><strong className='text-black'>Falaserver Productivo:</strong></p>
  {reporteActual.falaserverProd && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.falaserverProd}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  <p><strong className='text-black'>Falaserver Desarrollo:</strong></p>
  {reporteActual.falaserverDev && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.falaserverDev}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  <p><strong className='text-black'>Faladata:</strong></p>
  {reporteActual.faladata && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.faladata}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  <p><strong className='text-black'>Horarios Dags:</strong></p>
  {reporteActual.horariosDags && (
    <div className="flex justify-center mt-5">
      <img
        src={`http://localhost:8080/api/images/${reporteActual.horariosDags}`}
        className="max-w-xs rounded-lg"
      />
    </div>
  )}

  {reporteActual.condicionPipelines && (
    <p>
      <strong className='text-black'>Condición de Pipelines:</strong>{" "}
      {reporteActual.condicionPipelines}
    </p>
  )}

</div>

            <button
              onClick={() => setReporteActual(null)}
              className="mt-4 text-teal-600 underline w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

