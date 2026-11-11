# 📘 Documentación Técnica del Sistema

Este documento describe la arquitectura interna, la estructura de los módulos en Haskell y Prolog, y el mecanismo de interacción entre ambos paradigmas.

---

## 1. Estructura de las Reglas en Prolog (`reglas.pl` y `peliculas.pl`)

El motor lógico se divide en la base de conocimientos y las reglas de inferencia:

* **Base de Conocimientos (`peliculas.pl`):** Contiene los hechos que representan las películas guardadas con la estructura:
  ```prolog
  pelicula(Titulo, Genero, Anio).