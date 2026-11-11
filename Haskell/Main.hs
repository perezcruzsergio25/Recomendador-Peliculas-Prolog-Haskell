{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty

main :: IO ()
main = scotty 3000 $ do
    get "/" $ do
        file "Recursos/index.html"