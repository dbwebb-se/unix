#!/usr/bin/env bash

printf ">>> -------------- Post inspect -------------------------\n"

url=$(tail -1 me/kmom04/dockerhub.txt)

cd me/kmom04/client || exit 1

function printPause
{
    echo ""
    tput setaf 6
    read -p "$1 <Press Enter>"
    tput sgr0
    echo ""
}

function testClient
{
    echo ""
    tput setaf 6
    echo "----- Testing ./client.bash ($@) -----"
    read
    tput sgr0

    ./client.bash "$@"

    printPause "Done?"
}

testClient "-h"
testClient "-v"
testClient "all"
testClient "color" "Yellow"
testClient "test" "https://dbwebb.se"
testClient "test"
testClient "--save" "names"
ls -l

printPause "Do you see the saved file? (Created $(date +'%b %_d'))"

# Look at file?
tput setaf 6
read -r -p "----- Do you want to look at client.bash? [y/N] ----- " response
tput sgr0

if [ "$response" = "y" ]
then
    more client.bash
fi

printf ">>> -------------- Clean up -------------------------\n"

echo "Killing container!"
docker kill "testKmom04"

echo "Removing image: $url"
docker image rm --force "$url"
