import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    contraseña: "",
  });

  const [error, setError] = useState("");

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de contraseña
    if (!validatePassword(form.contraseña)) {
      setError(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/Registro", form);

      alert("Cuenta creada correctamente");

      navigate("/login"); // redirigir a login
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto  text-white rounded-xl shadow-lg shadow-lime-500/20">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

      <form className="space-y-3" onSubmit={manejarEnvio}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={manejarCambio}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"/>

        <input
          type="text"
          name="segundo_nombre"
          placeholder="Segundo Nombre"
          onChange={manejarCambio}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"/>

        <input
          type="text"
          name="apellido_paterno"
          placeholder="Apellido Paterno"
          onChange={manejarCambio}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"/>

        <input
          type="text"
          name="apellido_materno"
          placeholder="Apellido Materno"
          onChange={manejarCambio}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"/>

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={manejarCambio}
          className="  w-full border border-gray-500 bg-[#242424] text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"/>

        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          onChange={manejarCambio}
          className="  w-full border border-gray-500 bg-black text-white p-2 rounded outline-nonetransition focus:border-lime-400 focus:ring-1 focus:ring-lime-400 hover:border-lime-300"/>

        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        <button className="bg-lime-600 text-white font-semibold w-full p-2 rounded-lg transition hover:bg-lime-500 hover:shadow-[0_0_12px_#b3ff00]active:bg-lime-700">
          Crear Cuenta
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <a className="text-lime-500 underline" href="/login">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
