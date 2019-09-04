#!/usr/bin/env bash
cd me/kmom02/script || exit 1


function test_script
{
    echo ""
    tput setaf 6
    echo "----- Testing script $1 -----"
    tput sgr0

    ./"$1" "${@:2}"

}


test_script "hello.bash" ""
test_script "argument.bash" "See this?"

test_script "if_1.bash" "7"
test_script "if_1.bash" "3"

test_script "if_2.bash" "7"
test_script "if_2.bash" "3"
test_script "if_2.bash" "5"

test_script "argument_2.bash" "d"
test_script "argument_2.bash" "n"
test_script "argument_2.bash" "a"

test_script "forloop.bash"

test_script "myFunction.bash"









echo ""
