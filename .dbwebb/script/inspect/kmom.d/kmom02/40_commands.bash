#!/usr/bin/env bash
cd me/kmom02/commands || exit 1


function test_script
{
    echo ""
    tput setaf 6
    echo "----- Testing script $1 -----"
    tput sgr0

    ./"$1" "${@:2}"

}


test_script "hello.bash"
test_script "argument.bash" "See this?"

#
# echo ""
# tput setaf 6
# echo "----- Check for: commands.bash -----"
# tput sgr0
#
# ls -l

echo ""
