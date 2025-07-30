/**
* @file main.jsx
 * @description Punto de entrada de la aplicación React. Renderiza la interfaz principal que permite seleccionar una generación de Pokémon, ver los Pokémon de esa generación y alternar entre modo claro y oscuro. Incluye contexto de tema, efectos, y referencias para mejorar la experiencia del usuario.
 */
import { StrictMode, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { MostrarBotones } from "./components/hooks/UseState.jsx";
import { MostrarPokemones } from "./components/hooks/useEffect.jsx";
import { ThemeProvider, useTheme } from "./components/hooks/useContext.jsx";
import { Footer } from "./components/Footer.jsx";

/**
 * @function BotonToggleTema
 * @description Componente botón que permite alternar entre modo claro y oscuro. Utiliza el contexto de tema para leer y cambiar el modo actual.
 * @returns {JSX.Element} Botón con icono que indica el modo activo y cambia el tema al hacer clic.
 * @author Oscar Alvarez
 * @version 1.0.0
 */
function BotonToggleTema() {
  const { modoOscuro, toggleModo } = useTheme();

  return (
    <button
      onClick={toggleModo}
      className="fixed top-4 right-4 text-2xl p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      title={modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {modoOscuro ? "🌙" : "🌞"}
    </button>
  );
}

/**
 * @function AppPrincipal
 * @description Componente principal de la aplicación que maneja:
 *              - Estado de generación seleccionada.
 *              - Control del modo oscuro/claro mediante contexto.
 *              - Referencia al botón de la primera generación para scroll suave.
 *              - Animación de rotación en logo al cambiar generación.
 *              Renderiza el logo, título, botón toggle tema, botones de generaciones,
 *              listado de Pokémon de la generación seleccionada y el footer.
 * @returns {JSX.Element} Estructura completa de la aplicación.
 */
function AppPrincipal() {
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState(null);
  const { modoOscuro } = useTheme();
  const refGeneracion1 = useRef(null);
  const [girando, setGirando] = useState(false);

  useEffect(() => {
    setGeneracionSeleccionada(1); // Selecciona por defecto la generación 1 al montar el componente
    if (refGeneracion1.current) {
      // Hace scroll suave hacia el botón de la primera generación
      refGeneracion1.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /**
   * @function manejarClickGeneracion
   * @description Actualiza la generación seleccionada y activa animación de giro en el logo.
   * @param {number} idGeneracion - ID de la generación seleccionada.
   * @returns {void}
   */
  function manejarClickGeneracion(idGeneracion) {
    setGeneracionSeleccionada(idGeneracion);
    setGirando(true);
    setTimeout(() => setGirando(false), 2000); // Quita la animación después de 2 segundos
  }

  return (
    <div
      className={
        modoOscuro
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-[#ffe5b4] text-black min-h-screen"
      }
    >
      <div className="px-4 py-4 font-sans relative">
        {/* Logo Pokémon en la esquina superior izquierda, con animación condicional */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
          alt="Logo Pokémon"
          className={`absolute top-4 left-4 w-10 h-10 object-contain ${
            girando ? "animate-spin" : ""
          }`}
        />

        <h1 className="text-4xl font-bold text-center text-blue-700 my-8">
          Pokémon por Generación
        </h1>

        {/* Botón para alternar modo claro/oscuro */}
        <BotonToggleTema />

        {/* Botones para seleccionar generación */}
        <MostrarBotones
          setGeneracion={manejarClickGeneracion}
          generacion={generacionSeleccionada}
          refGeneracion1={refGeneracion1}
        />

        {/* Mostrar lista de Pokémon o mensaje para seleccionar generación */}
        {generacionSeleccionada ? (
          <MostrarPokemones generacion={generacionSeleccionada} />
        ) : (
          <p>Selecciona una generación para ver los Pokémon.</p>
        )}
      </div>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

/**
 * @function AppWrapper
 * @description Componente wrapper que envuelve la aplicación principal en el contexto de tema.
 * @returns {JSX.Element} Componente con provider del tema y la app principal.
 */
function AppWrapper() {
  return (
    <ThemeProvider>
      <AppPrincipal />
    </ThemeProvider>
  );
}

// Renderiza la aplicación en el elemento con id "root"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
