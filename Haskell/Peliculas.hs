module Peliculas (consultarPorGenero) where

import System.Process (readCreateProcess, shell)

-- Ejecuta la consulta a reglas.pl pasando el género deseado
consultarPorGenero :: String -> IO String
consultarPorGenero genero = do
    -- Construimos el comando para SWI-Prolog incluyendo comillas simples para el átomo de Prolog
    let comando = "swipl -q -g \"consult('Prolog/reglas.pl'), forall(buscar_por_genero(P, '" 
                  ++ genero 
                  ++ "'), writeln(P)), halt.\""
    -- Ejecutamos el comando y capturamos la salida en texto
    readCreateProcess (shell comando) ""