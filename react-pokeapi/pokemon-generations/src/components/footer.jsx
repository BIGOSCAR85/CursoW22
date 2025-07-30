/**
 * @file Footer.jsx
 * @description Componente de React que renderiza el pie de página con logo, crédito y enlace al desarrollador.
 */

/**
 * @function Footer
 * @description Renderiza un footer con el logo de Pokémon, un crédito al desarrollador con enlace a GitHub y un mensaje de agradecimiento a PokéAPI por las imágenes y datos.
 * @returns {JSX.Element} Elemento footer con contenido estilizado.
 */
function Footer() {
  return (
    <footer className="w-full mt-5 bg-[#EF5350] text-white py-2 text-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pokémon_logo.svg"
        alt="Logo Pokémon"
        className="mx-auto mb-3 h-10"
      />
      <p className="text-sm">
        Proyecto PokéAPI con React ⚛️ — Desarrollado por{" "}
        <a
          href="https://github.com/BIGOSCAR85"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-900"
        >
          BIGOSCAR85
        </a>
      </p>
      <p className="text-xs mt-1 text-gray-900">Imágenes y datos gracias a PokéAPI</p>
    </footer>
  );
}

export { Footer };
