#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom04/maze || exit 1

function testMaze {
    read -r -p "Execute mazerunner $*? [Y/n] " response

    if [[ ! "$response" = "n" ]]; then
        printf "\n${cyan}%s${normal}\n" "Testing $*"
        bash mazerunner.bash "$@"

        sleep 1
    fi
}
echo "Starting server..."
node index.js &
sleep 2

# Test client.bash



testMaze "init"
testMaze "maps"
testMaze "select" "1"
testMaze "enter"
testMaze "go" "east"
testMaze "go" "east"
testMaze "go" "south"
testMaze "go" "south"
testMaze "go" "south"
testMaze "go" "west"
testMaze "go" "west"
testMaze "loop"


read -r -p "Do you to view mazerunner.bash? [Y/n] " response

if [[ ! "$response" = "n" ]]; then
    cat mazerunner.bash
fi


# # Kill server
# echo ""
# echo "Killing the server..."
# if [[ -f "pid" ]]; then
#     PID=$(< "pid")
# fi
#
# kill $PID
# sleep 1
# echo "Server dead :)"
