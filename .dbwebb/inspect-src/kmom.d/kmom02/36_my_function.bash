#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom02/script || exit 1

script="my_function.bash"

printf "%s\n${cyan}" "Testing script $script"
./"$script" || exit 1
printf "${normal}\n"

read -r -p "View $script? [y/N] " response

if [[ "$response" = "y" ]]; then
    cat $script
fi
