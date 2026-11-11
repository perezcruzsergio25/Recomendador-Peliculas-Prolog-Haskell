document.getElementById("buscar")
.addEventListener("click", function () {

    const genero = document.getElementById("genero").value;
    const anio = document.getElementById("anio").value;
    const decada = document.getElementById("decada").value;
    const clasificacion = document.getElementById("clasificacion").value;
    const idioma = document.getElementById("idioma").value;
    const director = document.getElementById("director").value;

    document.getElementById("resultado").innerHTML =
        `
        <h3>🔍 Búsqueda realizada</h3>

        <p><strong>Género:</strong> ${genero}</p>
        <p><strong>Año:</strong> ${anio}</p>
        <p><strong>Década:</strong> ${decada}</p>
        <p><strong>Clasificación:</strong> ${clasificacion}</p>
        <p><strong>Idioma:</strong> ${idioma}</p>
        <p><strong>Director:</strong> ${director}</p>

        <hr>

        <p>Aquí aparecerán las recomendaciones.</p>
        `;
});
