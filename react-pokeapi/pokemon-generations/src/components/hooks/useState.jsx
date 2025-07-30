/**
 * @file useState.jsx
 * @description Componente contenedor que sirve como intermediario para renderizar el componente Generaciones y pasarle las props correspondientes.
 */

import { Generaciones } from "../Generaciones.jsx";

/**
 * @function MostrarBotones
 * @description Componente que encapsula y renderiza el componente Generaciones, facilitando la gestión de la generación activa.
 * @param {function} setGeneracion - Función que actualiza la generación seleccionada.
 * @param {number} generacion - ID de la generación actualmente seleccionada.
 * @param {React.RefObject} refGeneracion1 - Referencia al botón de la primera generación.
 * @returns {JSX.Element} Componente que muestra los botones de selección de generación.
 */
function MostrarBotones({ setGeneracion, generacion, refGeneracion1 }) {
  return (
    <Generaciones
      manejarClickGeneracion={setGeneracion}
      generacionActiva={generacion}
      refGeneracion1={refGeneracion1}
    />
  );
}

export { MostrarBotones };
