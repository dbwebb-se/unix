#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom02/script || exit 1

script="if_1.bash"

printf "%s\n${cyan}" "Testing script $script 7 (should be '7 is greater than 5')"
./"$script" 7 || exit 1
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script 3 (should be '3 is NOT greater than 5')"
./"$script" 3 || exit 1
printf "${normal}\n"

read -r -p "View $script? [y/N] " response

if [[ "$response" = "y" ]]; then
    cat $script
fi
