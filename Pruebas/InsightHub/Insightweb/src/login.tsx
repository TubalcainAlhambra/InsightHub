import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/Registro/login", {
        correo,
        contraseña,
      });

      if (!res.data) {
        setError("Correo o contraseña incorrectos");
        return;
      }

      // Guardar en AuthContext
      login({
        uid: res.data.id,
        email: res.data.correo,
        name: res.data.nombre,
        rol: res.data.rol || "USUARIO",
      });

      // Guardar en localStorage para persistencia
      localStorage.setItem("usuario", JSON.stringify(res.data));

      alert("Inicio de sesión exitoso");

      navigate("/home");
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-white rounded-xl shadow-lg shadow-lime-500/20">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

      <form className="space-y-3" onSubmit={manejarLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300" />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300" />

        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        <button className="bg-green-600 w-full text-white p-2 rounded mt-2">
          Entrar
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="text-blue-500 underline">
          Crear cuenta
        </a>
      </p>
    </div>
  );
}
