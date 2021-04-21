#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom02/script || exit 1

script="argument_2.bash"

printf "%s\n${cyan}" "Testing script $script d (should print today's date)"
./"$script" "d" || exit 1
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script n (should print 1 - 20)"
./"$script" "n" || exit 1
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script a (should print 'missing arguments')"
./"$script" "a" || exit 1
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script a test (should print 'test')"
./"$script" "a" "test" || exit 1
printf "${normal}\n"

read -r -p "View $script? [y/N] " response

if [[ "$response" = "y" ]]; then
    cat $script
fi
