/**
 * @file useRef.jsx
 * @description Componente que clona su primer hijo para añadirle una referencia (ref) React. Útil para controlar el enfoque o desplazamiento sobre ese elemento (por ejemplo, botón generación 1).
 */
import React from "react";

/**
 * @function ScrollGeneracion1
 * @param {React.ReactNode} children - Elementos hijos que serán renderizados, se añade ref al primero.
 * @param {React.RefObject} refGeneracion1 - Referencia que se pasa al primer hijo.
 * @returns {JSX.Element} Renderiza los hijos, pero el primero con un ref adicional.
 */
function ScrollGeneracion1({ children, refGeneracion1 }) {
  // Crea un nuevo arreglo de hijos, clonando el primero y añadiéndole la ref 'refGeneracion1'
  const hijosConRef = React.Children.map(children, (child, index) => {
    if (index === 0) {
      return React.cloneElement(child, { ref: refGeneracion1 });
    }
    return child;
  });

  return <>{hijosConRef}</>;
}
export { ScrollGeneracion1 };