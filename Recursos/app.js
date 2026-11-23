// Conectar píldoras rápidas del Hero con el selector de género
document.querySelectorAll(".tag-pill").forEach(function (pill) {
    pill.addEventListener("click", function () {
        const generoSeleccionado = this.getAttribute("data-genero");
        const selectGenero = document.getElementById("genero");

        // Si existe la opción en el select, la selecciona
        for (let option of selectGenero.options) {
            if (option.value.toLowerCase() === generoSeleccionado.toLowerCase()) {
                selectGenero.value = option.value;
                break;
            }
        }

        // Baja suavemente hasta la sección de filtros
        document.getElementById("filtros").scrollIntoView({ behavior: "smooth" });
    });
});

// Lógica del botón Buscar recomendaciones
document.getElementById("buscar")
.addEventListener("click", function () {

    const botonBuscar = document.getElementById("buscar");
    const contenedorResultados = document.getElementById("resultados");

    const genero = document.getElementById("genero").value;
    const anio = document.getElementById("anio").value;
    const decada = document.getElementById("decada").value;
    const idioma = document.getElementById("idioma").value;
    const director = document.getElementById("director").value;

    // 1. Mostrar estado de carga
    botonBuscar.disabled = true;
    botonBuscar.textContent = "⏳ Buscando...";
     
contenedorResultados.innerHTML = `
    <div class="loading-container">
        <div class="loader"></div>
        <p>Buscando recomendaciones...</p>
        <span>Analizando coincidencias con tus filtros</span>
    </div>
`;

    // 2. Mostrar 3 tarjetas recomendadas tras 800 ms
    setTimeout(function () {
   const recomendaciones = [
            { 
                titulo: "Interstellar", 
                duracion: "169 min", 
                top: "TOP 1", 
                poster: "img/poster1.jpg" 
            },
            { 
                titulo: "The Dark Knight", 
                duracion: "152 min", 
                top: "TOP 2", 
                poster: "img/poster2.jpg" 
            },
            { 
                titulo: "El Conjuro (The Conjuring)", 
                duracion: "112 min", 
                top: "TOP 3", 
                poster: "img/poster3.jpg" 
            }
        ];

        contenedorResultados.innerHTML = recomendaciones.map((peli, index) => {
            const coincidencia = index === 0 ? 96 : index === 1 ? 89 : 82;
            return `
            <div class="card">
                <div class="card-poster">
                    <img src="${peli.poster}" alt="Póster de ${peli.titulo}" class="movie-poster" onerror="this.src='img/poster1.jpg'">
                    <span class="badge-top">${peli.top}</span>
                </div>
                <div class="card-info">
                    <h3>${peli.titulo}</h3>
                    <div class="card-stars">⭐⭐⭐⭐⭐</div>
                    <div class="card-match">
                        <span>Compatible con tus filtros</span>
                        <strong>${coincidencia}%</strong>
                    </div>
                    <ul class="card-details">
                        <li><strong>Año:</strong> ${anio}</li>
                        <li><strong>Director:</strong> ${director}</li>
                        <li><strong>Idioma:</strong> ${idioma}</li>
                        <li><strong>Duración:</strong> ${peli.duracion}</li>
                    <div class="card-reasons">
                        <strong>¿Por qué te la recomendamos?</strong>
                        <ul>
                        <li>✓ Género: ${genero}</li>
                            <li>✓ Década de ${decada}</li>
                            <li>✓ Director: ${director}</li>
                            ${index < 2 ? `<li>✓ Idioma: ${idioma}</li>` : ""}
                            ${index === 0 ? `<li>✓ Año de estreno: ${anio}</li>` : ""}
                    </u1>    
                    </div>
                </div>
            </div>
        `;}).join("");

        botonBuscar.disabled = false;
        botonBuscar.textContent = "🔎 Buscar recomendaciones";
    }, 1000);
});

// =========================================
// 8. Historial de búsquedas recientes
// =========================================
const historialBusquedas = [];

function actualizarHistorial(busqueda) {
    const contenedorHistorial = document.getElementById("historial-container");
    const listaHistorial = document.getElementById("lista-historial");
    if (!contenedorHistorial || !listaHistorial) return;

    const etiqueta = `${busqueda.genero} + ${busqueda.director} + ${busqueda.idioma}`;

    // Evitar duplicados consecutivos y mantener máximo 4 recientes
    const existente = historialBusquedas.findIndex(item => item.etiqueta === etiqueta);
    if (existente !== -1) historialBusquedas.splice(existente, 1);
    historialBusquedas.unshift({ ...busqueda, etiqueta });
    if (historialBusquedas.length > 4) historialBusquedas.pop();

    contenedorHistorial.style.display = "block";
    listaHistorial.innerHTML = historialBusquedas.map((item, idx) => `
        <li data-idx="${idx}" title="Clic para repetir esta búsqueda">
            <span>🕒 ${item.etiqueta}</span>
        </li>
    `).join("");

    // Permitir hacer clic en un elemento del historial para repetir la búsqueda
    listaHistorial.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            const item = historialBusquedas[li.dataset.idx];
            document.getElementById("genero").value = item.genero;
            document.getElementById("anio").value = item.anio;
            document.getElementById("decada").value = item.decada;
            document.getElementById("idioma").value = item.idioma;
            document.getElementById("director").value = item.director;
            document.getElementById("buscar").click();
        });
    });
}

document.getElementById("buscar").addEventListener("click", function () {
    actualizarHistorial({
        genero: document.getElementById("genero").value,
        anio: document.getElementById("anio").value,
        decada: document.getElementById("decada").value,
        idioma: document.getElementById("idioma").value,
        director: document.getElementById("director").value
    });
});

function actualizarBarraCompatibilidad(tarjeta, porcentaje) {
    const relleno = tarjeta.querySelector(".compatibilidad-relleno");
    const textoPorcentaje = tarjeta.querySelector(".compatibilidad-porcentaje");
    const barra = tarjeta.querySelector(".compatibilidad-barra");

    if (!relleno || !textoPorcentaje || !barra) return;

    const valor = Math.max(0, Math.min(100, Math.round(porcentaje)));

    textoPorcentaje.textContent = `${valor}%`;
    relleno.style.width = `${valor}%`;
    barra.setAttribute("aria-valuenow", valor);

    if (valor >= 80) {
        textoPorcentaje.style.color = "#22c55e";
        relleno.style.background = "linear-gradient(90deg, #38bdf8, #22c55e)";
    } else if (valor >= 50) {
        textoPorcentaje.style.color = "#facc15";
        relleno.style.background = "linear-gradient(90deg, #f97316, #facc15)";
    } else {
        textoPorcentaje.style.color = "#f87171";
        relleno.style.background = "linear-gradient(90deg, #ef4444, #f97316)";
    }
}

const heroParallax = document.querySelector(".hero-parallax");

if (heroParallax) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroParallax.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}