:- ensure_loaded('peliculas.pl').

% ==========================================
% REGLAS DE CONSULTA Y FILTRADO EXPERTO
% ==========================================

% 1. Búsqueda por Género (Verifica si la película tiene el género en su primera o segunda posición)
buscar_por_genero(Pelicula, Genero) :-
    pelicula(Pelicula, Genero, _, _).
buscar_por_genero(Pelicula, Genero) :-
    pelicula(Pelicula, _, Genero, _).

% 2. Búsqueda por Año Mínimo (Películas estrenadas en o después de un año)
buscar_por_anio(Pelicula, AnioMinimo) :-
    pelicula(Pelicula, _, _, Anio),
    Anio >= AnioMinimo.

% 3. Filtrado Múltiple Avanzado (Género + Año Mínimo)
% Combina la lógica de género y año para dar recomendaciones más precisas
recomendar_avanzado(Pelicula, Genero, AnioMinimo) :-
    (pelicula(Pelicula, Genero, _, Anio) ; pelicula(Pelicula, _, Genero, Anio)),
    Anio >= AnioMinimo.

mostrar_peliculas :-
    pelicula(Titulo, Genero1, Genero2, Anio),
    format('~w | ~w | ~w | ~w~n',
           [Titulo, Genero1, Genero2, Anio]),
    fail.

mostrar_peliculas.

mostrar_por_genero(Genero) :-
    buscar_por_genero(Pelicula, Genero),
    writeln(Pelicula),
    fail.

mostrar_por_genero(_).