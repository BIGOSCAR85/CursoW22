/*Crea una aplicacion de lista de tareas que permita al usuario agregar, eliminar, marcar como completadas y listar tareas*/

// Lista donde se almacenarán las tareas
let listaTareas = [];

// Función para agregar una nueva tarea
function agregarTarea() {
  let nuevaTarea = prompt("Ingrese una nueva tarea:");
  if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
    // Se agrega la tarea con estado "no completada"
    listaTareas.push({ descripcion: nuevaTarea.trim(), completada: false });
    console.log("Tarea agregada: " + nuevaTarea);
  } else {
    console.log("Tarea vacía, no se agregó.");
  }
}

// Función para mostrar todas las tareas
function mostrarTareas() {
  if (listaTareas.length === 0) {
    console.log("No hay tareas.");
  } else {
    console.log("Lista de tareas:");
    // Recorremos la lista y mostramos cada tarea con su estado
    for (let i = 0; i < listaTareas.length; i++) {
      let estado = listaTareas[i].completada ? "[✔]" : "[ ]";
      console.log(i + 1 + ". " + estado + " " + listaTareas[i].descripcion);
    }
  }
}

// Función para borrar una tarea
function borrarTarea() {
  mostrarTareas(); // Mostramos tareas para que el usuario vea los números
  let indice = parseInt(
    prompt("Ingrese el número de la tarea que desea eliminar:")
  );
  if (!isNaN(indice) && indice >= 1 && indice <= listaTareas.length) {
    listaTareas.splice(indice - 1, 1); // Eliminamos la tarea
    console.log("Tarea eliminada.");
  } else {
    console.log("Número inválido.");
  }
}

// Función para marcar una tarea como completada
function marcarComoCompletada() {
  mostrarTareas();
  let indice = parseInt(
    prompt("Ingrese el número de la tarea que desea marcar como completada:")
  );
  if (!isNaN(indice) && indice >= 1 && indice <= listaTareas.length) {
    listaTareas[indice - 1].completada = true;
    console.log("Tarea marcada como completada.");
  } else {
    console.log("Número inválido.");
  }
}

// Función que muestra el menú principal y maneja la selección del usuario
function mostrarMenu() {
  console.log("\nMenú de opciones:");
  console.log("1. Agregar tarea");
  console.log("2. Mostrar tareas");
  console.log("3. Borrar tarea");
  console.log("4. Marcar tarea como completada");
  console.log("0. Salir");

  let opcion = parseInt(prompt("Ingrese una opción:"));

  if (opcion === 1) {
    agregarTarea();
    mostrarMenu(); // volvemos al menú
  } else if (opcion === 2) {
    mostrarTareas();
    mostrarMenu();
  } else if (opcion === 3) {
    borrarTarea();
    mostrarMenu();
  } else if (opcion === 4) {
    marcarComoCompletada();
    mostrarMenu();
  } else if (opcion === 0) {
    console.log("Saliendo del programa...");
  } else {
    console.log("Opción inválida.");
    mostrarMenu(); // volvemos al menú si se ingresó mal
  }
}

// Iniciar el programa mostrando el menú
mostrarMenu();
