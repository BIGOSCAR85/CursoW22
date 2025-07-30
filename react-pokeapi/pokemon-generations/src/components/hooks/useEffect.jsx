/**
 * @file useEffect.jsx
 * @description Componente que muestra los Pokémon de una generación específica. Utiliza la PokéAPI para obtener datos y los presenta con un efecto de flip card.
 */
import { useState, useEffect } from "react";
import "../flipCard.css";

/**
 * @function MostrarPokemones
 * @description Recupera y muestra la lista de Pokémon pertenecientes a la generación seleccionada. Controla estado de carga y filtra nombres válidos para evitar errores 404.
 * @param {number} generacion - ID de la generación seleccionada para mostrar sus Pokémon.
 * @returns {JSX.Element} Componente que renderiza la lista de Pokémon con su información y efecto visual.
 */
function MostrarPokemones({ generacion }) {
  const [listaPokemones, setListaPokemones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [listaPokemonOficial, setListaPokemonOficial] = useState([]);

  // Obtener todos los nombres válidos de Pokémon desde la API al montar el componente
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1300")
      .then((respuestaServidor) => respuestaServidor.json())
      .then((datos) => {
        const nombresValidos = datos.results.map((pokemon) => pokemon.name);
        setListaPokemonOficial(nombresValidos);
      });
  }, []);

  // Obtener los detalles de los Pokémon de la generación seleccionada cada vez que cambian generación o lista oficial
  useEffect(() => {
    if (!generacion || listaPokemonOficial.length === 0) return;

    setCargando(true);

    fetch(`https://pokeapi.co/api/v2/generation/${generacion}`)
      .then((respuestaServidor) => respuestaServidor.json())
      .then(async (datosGeneracion) => {
        const listaEspecies = datosGeneracion.pokemon_species.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        const detallesPokemones = await Promise.all(
          listaEspecies.map(async (especie) => {
            try {
              // Obtener variedad principal desde species
              const respuestaEspecie = await fetch(especie.url);
              const datosEspecie = await respuestaEspecie.json();

              const nombreCorrecto = datosEspecie.varieties[0].pokemon.name;

              if (!listaPokemonOficial.includes(nombreCorrecto)) return null;

              const respuestaPokemon = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${nombreCorrecto}`
              );

              if (!respuestaPokemon.ok) throw new Error("Fetch fallido");

              const datosPokemon = await respuestaPokemon.json();

              const imagenSegura = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datosPokemon.id}.png`;

              return {
                name: datosPokemon.name,
                id: datosPokemon.id,
                types: datosPokemon.types.map((tipo) => tipo.type.name),
                ability: datosPokemon.abilities[0]?.ability.name || "N/A",
                imagen: imagenSegura,
              };
            } catch (error) {
              return null;
            }
          })
        );

        setListaPokemones(detallesPokemones.filter(Boolean));
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [generacion, listaPokemonOficial]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Pokémon de la Generación {generacion}
      </h2>

      {cargando ? (
        <p className="text-center text-gray-500">Cargando Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {listaPokemones.map((pokemon) => (
            <div key={pokemon.name} className="flip-card scale-80">
              <div className="flip-card-inner">
                {/* Cara frontal */}
                <div className="flip-card-front bg-gradient-to-br from-[#CFFFE5] to-[#E2D5F9] rounded-lg p-4 text-black">
                  <img
                    src={pokemon.imagen}
                    alt={pokemon.name}
                    className="w-40 h-40 mx-auto drop-shadow-lg"
                  />
                  <p className="mt-2 capitalize font-semibold text-center">
                    {pokemon.name}
                  </p>
                </div>

                {/* Cara trasera */}
                <div className="flip-card-back">
                  <p className="font-bold mb-1">N.º {pokemon.id}</p>
                  <p className="capitalize mb-1">
                    <span className="font-semibold">Tipo(s): </span>
                    {pokemon.types.join(", ")}
                  </p>
                  <p className="capitalize">
                    <span className="font-semibold">Habilidad: </span>
                    {pokemon.ability}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { MostrarPokemones };
