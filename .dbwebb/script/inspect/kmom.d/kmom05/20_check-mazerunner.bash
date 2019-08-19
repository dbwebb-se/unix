#!/usr/bin/env bash

function testMaze {
    read -r -p "Execute mazerunner $2? [Y/n] " response

    if [ ! "$response" = "n" ]
    then
        echo ""
        echo "#################"
        echo "Testing: $1"
        echo "#################"
        shift
        echo ""
        bash mazerunner.bash $@
        echo ""
        sleep 1
    fi
}
echo "Starting server..."
cd "me/kmom05/maze" && node index.js &
sleep 2

# Test client.bash
cd "me/kmom05/maze"

testMaze "Init" "init"
testMaze "Maps" "maps"
testMaze "Select" "select 1"
testMaze "Enter" "enter"
testMaze "Go EAST" "go east"
testMaze "Go EAST" "go east"
testMaze "Go SOUTH" "go south"
testMaze "Go SOUTH" "go south"
testMaze "Go SOUTH" "go south"
testMaze "Go WEST" "go west"
testMaze "Go WEST" "go west"
testMaze "LOOP" "loop"


read -r -p "Do you to view mazerunner.bash? [Y/n] " response

if [ ! "$response" = "n" ]
then
    cat mazerunner.bash
fi


# Kill server
echo ""
echo "Killing the server..."
if [ -f "pid" ]
then
    PID=$(< "pid")
fi

kill $PID
sleep 1
echo "Server dead :)"
