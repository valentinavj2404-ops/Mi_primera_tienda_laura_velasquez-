const productos = [
  {
    id: 1,
    nombre: "iphone 16e",
    descripcion: "iPhone 16e: potente, elegante y con tecnología de última generación.",
    precio: 25000,
    imagen: "https://www.phonelectrics.com/cdn/shop/files/iPhone16e-5.jpg?v=1742231350&width=1200"
  },
  {
    id: 2,
    nombre: "Samsung 26 Ultra+",
    descripcion: "Samsung Galaxy S26 Ultra+, diseñado para llevar tu experiencia móvil al siguiente nivel.",
    precio: 18000,
    imagen: "https://images.samsung.com/is/image/samsung/assets/co/s2602/pcd/smartphones/PF_Main-Category_Galaxy-Smartphone_176x176.png?$ORIGIN_PNG$"
  },
  {
    id: 3,
    nombre: "iphone 17 pro max",
    descripcion: " iPhone 17 Pro Max en excelente estado, potente, elegante y listo para estrenar.",
    precio: 30000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQa3LcdJlLb9B-4C-Qb20JZtWRhsMbpo5dSeumGcyw-12GNFUD8DhBNrwg&s=10"
  },
  {
    id: 4,
    nombre: "Redmi Note 15",
    descripcion: "Excelente celular, moderno y potente, con pantalla de gran calidad, buen rendimiento y cámara ideal para tus fotos y videos.",
    precio: 18000,
    imagen: "https://tienda.movistar.com.co/media/catalog/product/m/o/movistar_1_512_x_640_6.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=300&width=240&canvas=240:300"
  },
  {
    id: 5,
    nombre: "iphone 17",
    descripcion: "El iPhone 17 es un smartphone moderno y potente, con un diseño elegante, excelente cámara, gran rendimiento y una pantalla de alta calidad.",
    precio: 22000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3NdaOiMxOg5kO3f5Z0SHoE8dJB4ExGdUmzH-d_IkRo6KZG1n2cCybzsW&s=10"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
