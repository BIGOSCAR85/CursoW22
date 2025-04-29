function semaforo(color) {
  if (!color) {
      console.log("No se recibió ningún color");
      return;
  }

  switch (color.toLowerCase()) {
      case "rojo":
          console.log("Detenerse");
          break;
      case "amarillo":
          console.log("Precaución");
          break;
      case "verde":
          console.log("Avanzar");
          break;
      default:
          console.log("Color no válido");
  }
}

// Uso del `prompt`
const entrada = prompt("Ingrese un color:");
semaforo(entrada);