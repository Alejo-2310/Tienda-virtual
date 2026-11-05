// Catálogo basado en las 15 imágenes que se adjuntaron.
const productos = [
  {nombre:"POCO M8 Pro 5G", marca:"POCO", imagen:"celular-01.jpg", descripcion:"Pantalla amplia y rendimiento potente."},
  {nombre:"POCO M8 5G", marca:"POCO", imagen:"celular-02.jpg", descripcion:"Diseño moderno para el día a día."},
  {nombre:"POCO X8 Pro", marca:"POCO", imagen:"celular-03.jpg", descripcion:"Experiencia de alto rendimiento."},
  {nombre:"POCO C71", marca:"POCO", imagen:"celular-04.jpg", descripcion:"Una opción práctica y funcional."},
  {nombre:"TECNO Camon 50", marca:"TECNO", imagen:"celular-05.jpg", descripcion:"Enfocado en fotografía y diseño."},
  {nombre:"TECNO Pova Curve 2", marca:"TECNO", imagen:"celular-06.jpg", descripcion:"Estilo futurista y gran pantalla."},
  {nombre:"TECNO Spark 50 5G", marca:"TECNO", imagen:"celular-07.jpg", descripcion:"Conectividad y diseño actual."},
  {nombre:"TECNO Spark 50", marca:"TECNO", imagen:"celular-08.jpg", descripcion:"Una alternativa para todos los días."},
  {nombre:"TECNO Spark Go 3", marca:"TECNO", imagen:"celular-09.jpg", descripcion:"Funciones esenciales y diseño juvenil."},
  {nombre:"Infinix Hot 60 Pro Plus", marca:"Infinix", imagen:"celular-10.jpg", descripcion:"Diseño delgado y pantalla envolvente."},
  {nombre:"Infinix Hot 70", marca:"Infinix", imagen:"celular-11.jpg", descripcion:"Rendimiento para entretenimiento."},
  {nombre:"Infinix Note 60 Pro", marca:"Infinix", imagen:"celular-12.jpg", descripcion:"Potencia y estilo en un solo equipo."},
  {nombre:"Infinix Note 60", marca:"Infinix", imagen:"celular-13.jpg", descripcion:"Equilibrio para tu rutina."},
  {nombre:"Infinix Hot 70 Pro", marca:"Infinix", imagen:"celular-14.jpg", descripcion:"Una experiencia completa."},
  {nombre:"Infinix Smart 2", marca:"Infinix", imagen:"celular-15.jpg", descripcion:"Una opción sencilla y accesible."}
];

const rejilla = document.getElementById("rejillaProductos");
const carrito = [];

function mostrarProductos(filtro = "Todos") {
  const lista = filtro === "Todos" ? productos : productos.filter(p => p.marca === filtro);
  rejilla.innerHTML = lista.map(producto => {
    const indice = productos.indexOf(producto);
    return `
      <article class="producto">
        <div class="producto-imagen"><img src="imagenes/${producto.imagen}" alt="${producto.nombre}" loading="lazy">
          <span class="marca">${producto.marca}</span>
        </div>
        <div class="producto-info"><h3>${producto.nombre}</h3><p>${producto.descripcion}</p>
          <div class="producto-pie"><span class="precio">Consultar precio</span>
            <button class="btn-agregar" data-indice="${indice}" aria-label="Consultar ${producto.nombre}">+</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

mostrarProductos();

document.querySelectorAll(".filtro").forEach(boton => {
  boton.addEventListener("click", () => {
    document.querySelector(".filtro.activo")?.classList.remove("activo");
    boton.classList.add("activo");
    mostrarProductos(boton.dataset.filtro);
  });
});

rejilla.addEventListener("click", evento => {
  const boton = evento.target.closest(".btn-agregar");
  if (!boton) return;
  const producto = productos[Number(boton.dataset.indice)];
  carrito.push(producto);
  actualizarContador();
  boton.textContent = "✓";
  setTimeout(() => boton.textContent = "+", 900);
});

function actualizarContador() {
  document.getElementById("contadorCarrito").textContent = carrito.length;
}

function abrirModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("mostrar");
  modal.setAttribute("aria-hidden", "false");
}
function cerrarModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("mostrar");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("abrirLogin").addEventListener("click", () => abrirModal("modalLogin"));
document.getElementById("verCarrito").addEventListener("click", () => {
  mostrarCarrito();
  abrirModal("modalCarrito");
});
document.querySelectorAll("[data-cerrar]").forEach(b => b.addEventListener("click", () => cerrarModal(b.dataset.cerrar)));
document.querySelectorAll(".modal").forEach(modal => modal.addEventListener("click", e => {
  if (e.target === modal) cerrarModal(modal.id);
}));

function mostrarCarrito() {
  const contenedor = document.getElementById("contenidoCarrito");
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='carrito-vacio'>Todavía no has agregado celulares.</p>";
    return;
  }
  contenedor.innerHTML = `<ul class="lista-carrito">${carrito.map(p => `<li>${p.nombre}<span>Consultar precio</span></li>`).join("")}</ul>
    <p class="nota-demo">Los precios se consultan con un asesor. Este carrito es demostrativo.</p>`;
}

document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito.length = 0;
  actualizarContador();
  mostrarCarrito();
});

document.getElementById("formContacto").addEventListener("submit", evento => {
  evento.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  document.getElementById("respuestaContacto").textContent =
    `¡Gracias, ${nombre}! Tu consulta quedó registrada en esta demostración.`;
  evento.target.reset();
});

document.getElementById("formLogin").addEventListener("submit", evento => {
  evento.preventDefault();
  document.getElementById("respuestaLogin").textContent =
    "Formulario validado. Para tener cuentas reales necesitas conectar un sistema de autenticación y una base de datos.";
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navegacion").classList.toggle("nav-abierta");
});
document.querySelectorAll(".navegacion a").forEach(enlace => enlace.addEventListener("click", () => {
  document.getElementById("navegacion").classList.remove("nav-abierta");
}));
