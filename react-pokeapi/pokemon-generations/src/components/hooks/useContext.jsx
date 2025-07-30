/**
 * @file useContext.jsx
 * @description Contexto y provider para manejar modo oscuro/claro en la aplicación React.
 */

import React, { createContext, useState, useContext } from "react";

/**
 * @constant ThemeContext
 * @description Contexto React que almacena el estado y función para alternar el modo oscuro.
 */
const ThemeContext = createContext();

/**
 * @function ThemeProvider
 * @description Proveedor del contexto que administra el estado modoOscuro y la función toggleModo.
 * @param {object} props
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el provider.
 * @returns {JSX.Element} Provider con estado y función para el modo oscuro.
 */
export function ThemeProvider({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleModo = () => setModoOscuro((previos) => !previos);

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleModo }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * @function useTheme
 * @description Hook personalizado para acceder al contexto ThemeContext y obtener estado y función para el modo oscuro.
 * @returns {{ modoOscuro: boolean, toggleModo: function }} Estado y función para alternar modo.
 */
export function useTheme() {
  return useContext(ThemeContext);
}


