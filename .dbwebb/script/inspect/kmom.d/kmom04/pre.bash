#!/usr/bin/env bash

printf ">>> -------------- Pre inspect -------------------------\n"

port=$(head -1 me/kmom04/dockerhub.txt)
url=$(tail -1 me/kmom04/dockerhub.txt)

dockerId=$(docker run --rm --name testKmom04 -d -p 8083:"$port" -it -v $(pwd)/example/json/:/var/www/html/data/ "$url")

function testServer
{
    tput setaf 6
    read -p "Curling localhost:8083/$1 <Press Enter>"
    tput sgr0
    curl "http://localhost:8083/$1"
    tput setaf 6
    echo ""
    read -p "Done viewing? <Press Enter>"
    tput sgr0
}

testServer "all"
testServer "names"
testServer "color/Yellow"


eval "$BROWSER" "localhost:8083/all" &

tput setaf 6
read -p "Done with viewing browser? <Press Enter>"
tput sgr0

# docker kill "$dockerId"
