// ==========================
// 🔧 Variables globales
// ==========================
const form = document.getElementById("productoForm");
const listaProductos = document.getElementById("listaProductos");
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// ==========================
// ⛔ Prevenir acciones por defecto
// ==========================

// Evita enviar el formulario presionando Enter en inputs (excepto textarea)
form.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
  }
});

// Previene el envío estándar del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

// ==========================
// 💾 Función para guardar un producto (nuevo o editado)
// ==========================
function guardarProducto() {
  if (!form.checkValidity()) {
    form.reportValidity(); // muestra errores de validación nativos
    return;
  }

  const nuevoProducto = {
    id: document.getElementById("productoId").value || Date.now(),
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    categoria: document.getElementById("categoria").value,
    subcategoria: document.getElementById("subcategoria").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    precioCompra: parseFloat(document.getElementById("precioCompra").value),
    precioVenta: parseFloat(document.getElementById("precioVenta").value),
    costoEnvio: parseFloat(document.getElementById("costoEnvio").value),
    cantidadStock: parseInt(document.getElementById("cantidadStock").value),
    cantidadMinima: parseInt(document.getElementById("cantidadMinima").value),
    proveedor: document.getElementById("proveedor").value,
    fechaIngreso: document.getElementById("fechaIngreso").value,
    fechaVencimiento: document.getElementById("fechaVencimiento").value,
    peso: parseFloat(document.getElementById("peso").value),
    dimensiones: {
      largo: parseFloat(document.getElementById("largo").value),
      ancho: parseFloat(document.getElementById("ancho").value),
      alto: parseFloat(document.getElementById("alto").value),
    },
    color: document.getElementById("color").value,
    material: document.getElementById("material").value,
    codigoBarras: document.getElementById("codigoBarras").value,
    imagenes: [
      document.getElementById("imagen1").value,
      document.getElementById("imagen2").value,
    ],
    especificacionesTecnicas: {
      capacidad: document.getElementById("capacidad").value,
      voltaje: document.getElementById("voltaje").value,
    },
    estado: document.getElementById("estado").value,
    tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
    notas: document.getElementById("notas").value,
  };

  // Verifica si ya existe el producto (por ID) para editar o agregar
  const index = productos.findIndex(p => p.id == nuevoProducto.id);
  if (index >= 0) {
    productos[index] = nuevoProducto; // editar
  } else {
    productos.push(nuevoProducto); // agregar nuevo
  }

  // Guardar en localStorage
  localStorage.setItem("productos", JSON.stringify(productos));

  // Resetear el formulario
  form.reset();
  document.getElementById("productoId").value = "";

  // Volver a renderizar la lista
  renderizarProductos();
}

// ==========================
// 🖼️ Renderizar productos en tarjetas
// ==========================
function renderizarProductos() {
  listaProductos.innerHTML = "";

  productos.forEach((p) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <h2 class="text-xl font-bold">${p.nombre}</h2>
      <p class="text-gray-600">${p.descripcion}</p>
      <p><strong>Precio Venta:</strong> $${p.precioVenta}</p>
      <p><strong>Stock:</strong> ${p.cantidadStock}</p>
      <p><strong>Proveedor:</strong> ${p.proveedor || "N/A"}</p>
      <p><strong>Marca:</strong> ${p.marca || "N/A"}</p>
      <p><strong>Estado:</strong> ${p.estado || "N/A"}</p>
      <p><strong>Fecha Ingreso:</strong> ${p.fechaIngreso || "N/A"}</p>
      <p><strong>Fecha Vencimiento:</strong> ${p.fechaVencimiento || "N/A"}</p>
      <div class="flex gap-2 mt-2">
        <button onclick="editarProducto(${p.id})" class="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">Editar</button>
        <button onclick="eliminarProducto(${p.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
      </div>
    `;

    listaProductos.appendChild(card);
  });
}

// ==========================
// ✏️ Cargar producto en formulario para edición
// ==========================
function editarProducto(id) {
  const producto = productos.find(p => p.id == id);

  for (const key in producto) {
    if (typeof producto[key] === "object" && !Array.isArray(producto[key])) {
      // Objetos anidados (dimensiones, especificacionesTecnicas)
      for (const subkey in producto[key]) {
        const el = document.getElementById(subkey);
        if (el) el.value = producto[key][subkey];
      }
    } else if (Array.isArray(producto[key])) {
      // Arreglos (imagenes)
      producto[key].forEach((val, i) => {
        const el = document.getElementById(`imagen${i + 1}`);
        if (el) el.value = val;
      });
    } else {
      // Valores simples
      const el = document.getElementById(key);
      if (el) el.value = producto[key];
    }
  }

  // Establece el ID oculto para saber si es edición
  document.getElementById("productoId").value = producto.id;
}

// ==========================
// ❌ Eliminar producto
// ==========================
function eliminarProducto(id) {
  id = Number(id); // asegurar que sea número
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    productos = productos.filter(p => Number(p.id) !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderizarProductos();
  }
}

// ==========================
// 🔘 Asignar evento al botón de guardar
// ==========================
document.getElementById("guardarBtn").addEventListener("click", guardarProducto);

// ==========================
// 🔁 Renderizar al cargar
// ==========================
renderizarProductos();
