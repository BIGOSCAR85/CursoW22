/*Crea una calculadora que pueda realizar cualquier cantidad de operaciones (suma, restas, multiplicación, división, potencia, paréntesis)*/
// Función para agregar un valor al display
function appendValue(value) {
  let display = document.getElementById("display");
  let current = display.value;

  // Solo permite caracteres válidos (números, operadores, paréntesis, etc.)
  let validRegex = /^[0-9+\-*/^().%√ ]$/;
  if (!validRegex.test(value)) return;

  // Lista de operadores a controlar (excepto paréntesis)
  let operadores = ['+', '-', '*', '/', '%', '^'];

  // Si el display solo tiene un 0, lo reemplaza por el nuevo valor
  if (current === "0") {
    // Permite solo números o paréntesis después de "0"
    if (!isNaN(value) || value === '(' || value === '√') {
    display.value = value;
  }
  return;
  }
  let lastChar = current.slice(-1);

  // Prevenir operadores duplicados
  if (operadores.includes(lastChar) && operadores.includes(value)) {
    return;
  }
  display.value += value;
  }

// Muestra u oculta el menú desplegable al hacer clic en el ícono de hamburguesa
document.getElementById("menu-toggle").addEventListener("click", () => {
  let menu = document.getElementById("dropdown-menu");

  // Alterna entre mostrar u ocultar el menú
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Cierra el menú desplegable si se hace clic fuera del menú
window.addEventListener("click", function (e) {
  let menu = document.getElementById("dropdown-menu");

  // Si el clic no fue dentro del menú hamburguesa, se oculta el menú
  if (!document.querySelector(".menu-hamburguesa").contains(e.target)) {
    menu.style.display = "none";
  }
});

// Cambia el título según la opción del menú que se seleccione
document.querySelectorAll("#dropdown-menu a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault(); // Evita que el enlace recargue la página

    // Cambia el texto del título al que se seleccionó
    let nuevoTexto = this.textContent;
    document.getElementById("tipo-seleccionado").textContent = nuevoTexto;
  });
});

// Limpia el display, volviendo a "0"
function clearDisplay() {
  document.getElementById("display").value = "0";
}

// Borra el último carácter del display
function deleteLast() {
  const display = document.getElementById("display");

  // Elimina el último carácter del valor actual
  display.value = display.value.slice(0, -1);

  // Si queda vacío, vuelve a poner "0"
  if (display.value === "") {
    display.value = "0";
  }
}

// Calcula el resultado de la operación escrita en el display
function calculate() {
  try {
    let expression = document.getElementById("display").value;

    // Reemplaza comas por puntos para que math.js pueda evaluar decimales
    expression = expression.replace(/,/g, '.');

    // Evalúa la expresión matemática usando math.js
    let result = math.evaluate(expression);

    // Muestra el resultado en el display
    document.getElementById("display").value = result;
  } catch (e) {
    // Si ocurre un error (por ejemplo, una operación inválida), muestra "Error"
    document.getElementById("display").value = "Error";
  }
}

// Alterna entre modo claro y modo oscuro
function cambiarModo() {
  let boton = document.getElementById("modo");
  let body = document.body;

  // Si el ícono actual es el sol, cambiar a modo oscuro
  if (boton.innerHTML === "☀️") {
    boton.innerHTML = "🌙";
    body.style.backgroundColor = "black";
    body.style.color = "white";
  } else {
    // Si el ícono es la luna, cambiar a modo claro
    boton.innerHTML = "☀️";
    body.style.backgroundColor = "white";
    body.style.color = "black";

    // Alterna clase CSS (por si quieres aplicar estilos desde CSS)
    body.classList.toggle("oscuro");
  }
}