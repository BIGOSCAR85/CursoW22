/**
 * @file Generaciones.jsx
 * @description Componente de React que muestra una lista de botones para seleccionar distintas generaciones de Pokémon.
 */

import React from "react";

/**
 * @function Generaciones
 * @description Renderiza una serie de botones que representan las generaciones de Pokémon. Al hacer clic en un botón, se actualiza la generación activa.
 * @param {function} manejarClickGeneracion - Función callback que se ejecuta al seleccionar una generación, recibe el ID de la generación.
 * @param {number} generacionActiva - ID de la generación actualmente seleccionada.
 * @param {React.RefObject} refGeneracion1 - Referencia al botón de la primera generación, útil para enfoque o desplazamiento.
 * @returns {JSX.Element} Componente de botones para seleccionar generaciones.
 * @author Oscar Alvarez
 * @version 1.0.0
 * @see {@link https://es.reactjs.org/docs/components-and-props.html}
 */
function Generaciones({ manejarClickGeneracion, generacionActiva, refGeneracion1 }) {
  // Lista de generaciones disponibles con sus identificadores y nombres
  const generaciones = [
    { id: 1, nombre: "Generación I" },
    { id: 2, nombre: "Generación II" },
    { id: 3, nombre: "Generación III" },
    { id: 4, nombre: "Generación IV" },
    { id: 5, nombre: "Generación V" },
    { id: 6, nombre: "Generación VI" },
    { id: 7, nombre: "Generación VII" },
    { id: 8, nombre: "Generación VIII" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {generaciones.map((generacion) => (
        <button
          key={generacion.id}
          onClick={() => manejarClickGeneracion(generacion.id)}
          ref={generacion.id === 1 ? refGeneracion1 : null}
          className={`px-5 py-2 rounded-xl shadow-lg font-semibold transition duration-300 ease-in-out
            ${
              generacionActiva === generacion.id
                ? "bg-purple-500 text-black"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 hover:shadow-xl"
            }`}
        >
          {generacion.nombre}
        </button>
      ))}
    </div>
  );
}

export { Generaciones };
