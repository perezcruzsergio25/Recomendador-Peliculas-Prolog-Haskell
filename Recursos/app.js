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
            <div class="spinner"></div>
            <p>Buscando recomendaciones...</p>
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
    }, 800);
});