# 7. Pruebas del Sistema

En esta sección se documentan las pruebas unitarias y de integración realizadas para verificar la correcta comunicación entre la interfaz en Haskell, el motor de reglas en Prolog y la base de conocimientos (`peliculas.pl`).

---

### Prueba 1: Búsqueda por Género
* **Descripción:** Verificar que el sistema filtre y devuelva correctamente las películas asociadas a un género específico.
* **Entrada:** 
  * `Genero = ciencia_ficcion`
* **Salida Esperada:** 
  * Inception
  * Interstellar
  * Matrix
  * (Y demás películas correspondientes en la base de datos con ese género)
* **Resultado:** **Correcto** / Exitoso. El sistema recupera y muestra las películas correspondientes sin errores.

---

### Prueba 2: Búsqueda por Año
* **Descripción:** Verificar que el sistema filtre las películas estrenadas en o después de un año determinado.
* **Entrada:** 
  * `Anio = 2010`
* **Salida Esperada:** 
  * Inception (2010)
  * Interstellar (2014)
  * Avengers (2012)
  * Coco (2017), etc.
* **Resultado:** **Correcto** / Exitoso. El sistema muestra las películas correctamente.

---

## 📌 Control de Versiones y Flujo de Trabajo

El repositorio gestiona el desarrollo de forma local y remota mediante las siguientes prácticas estándar de Git:

* **Estrategia de Ramas:** Uso de la rama principal (`master`/`main`) para la versión estable y ramas específicas de desarrollo o características para nuevas funciones o módulos del sistema.
* **Historial de Commits:** Uso de mensajes claros y ordenados para el registro de cambios (ej. `git add`, `git commit -m "feat: descripción"`).
* **Sincronización:** Actualización y envío de cambios al repositorio remoto mediante operaciones de `push` y gestión de repositorios compartidos (`fork` o `pull requests` cuando aplique).
