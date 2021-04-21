#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom02/script || exit 1

script="commands.bash"

printf "%s\n${cyan}" "Testing script $script -h (should print helptext)"
./"$script" "-h"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script --version (should print version)"
./"$script" "--version"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script cal (should print a calendar)"
./"$script" "cal"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script greet (should print a greeting to \$USER)"
./"$script" "greet"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script loop 24 31 (should print 24 - 31)"
./"$script" "loop" "24" "31"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script lower 43 31 4 24 56 (should print '31 4 24')"
./"$script" "lower" "43" "31" "4" "24" "56"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script reverse Bash is awesome! (should print '!emosewa si hsaB')"
./"$script" "reverse" "Bash is awesome!"
printf "${normal}\n"

printf "%s\n${cyan}" "Testing script $script all (should print everything.)"
./"$script" "all"
printf "${normal}\n"

read -r -p "View $script? [y/N] " response

if [[ "$response" = "y" ]]; then
    cat $script
fi
