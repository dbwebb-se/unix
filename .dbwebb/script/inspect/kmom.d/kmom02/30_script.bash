#!/usr/bin/env bash
cd me/kmom02/script || exit 1


function test_script
{
    echo ""
    tput setaf 6
    echo "----- Testing script $1 -----"
    tput sgr0

    while (( $# )); do
        case "$1" in
            hello.bash)
                ./"$1"
                shift
            ;;
            argument.bash)
                ./"$1" "See me?"
                shift
            ;;
            if_1.bash)
                ./"$1" 7
                ./"$1" 3
                shift
            ;;
            if_2.bash)
                ./"$1" 7
                ./"$1" 3
                ./"$1" 5
                shift
            ;;
            argument_2.bash)
                ./"$1" "d"
                ./"$1" "n"
                ./"$1" "a"
                ./"$1" "a I-am-visible"
                shift
            ;;
            forloop.bash)
                ./"$1"
                shift
            ;;
            myFunction.bash)
                ./"$1"
                shift
            ;;
            *)
            exit 0
            ;;
        esac
    done
}

test_script "hello.bash"
test_script "argument.bash"
test_script "if_1.bash"
test_script "if_2.bash"
test_script "argument_2.bash"
test_script "forloop.bash"
test_script "myFunction.bash"

echo ""
