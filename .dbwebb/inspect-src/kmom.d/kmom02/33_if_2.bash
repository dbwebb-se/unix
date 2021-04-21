#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom02/script || exit 1

script="if_2.bash"

printf "%s\n${cyan}" "Testing script $script 7 (should be 'higher')"
./"$script" 7 || exit 1
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script 3 (should be 'lower')"
./"$script" 3 || exit 1
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script 5 (should be 'same')"
./"$script" 5 || exit 1
printf "${normal}\n"

read -r -p "View $script? [y/N] " response

if [[ "$response" = "y" ]]; then
    cat $script
fi
