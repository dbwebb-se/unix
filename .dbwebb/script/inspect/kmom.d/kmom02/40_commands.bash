#!/usr/bin/env bash
cd me/kmom02/script || exit 1


function test_script
{
    echo ""
    tput setaf 6
    echo "----- Testing script $1 $2-----"
    tput sgr0

    ./"$1 $2"

}


test_script "commands.bash" "-h"
test_script "commands.bash" "-v"
test_script "commands.bash" "cal"
test_script "commands.bash" "greet"
test_script "commands.bash" "5 18"
test_script "commands.bash" "reverse obi wan knobi"



echo ""
