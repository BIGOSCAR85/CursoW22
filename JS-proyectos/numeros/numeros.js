function evaluarNumero(numero) {
  if (numero === undefined || numero === null || numero === "") {
      console.log("No se recibió ningún número");
      return;
  }
  
  if (isNaN(numero)) {
      console.log("No es un número");
      return;
  }

  if (numero % 2 === 0) {
      console.log("El número es par");
  } else {
      console.log("El número es impar");
  }
}

// Uso del `prompt`
const numeroIngresado = prompt("Ingrese un número:");
evaluarNumero(numeroIngresado);