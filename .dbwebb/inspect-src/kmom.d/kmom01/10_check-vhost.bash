#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom01/vhost || exit 1

function printthisfile
{
    read -p "Press any key to view: $path "
    printf "\n${cyan}"
    more "$1"
    printf "${normal}\n"
}

function printerror
{
    printf "${red} $1 '%s'\n ${normal}" "$2"
}

echo "[$ACRONYM] Check for dump.png, configfile and log.txt"
read -p "Press any key to view content of folder vhost/. "

ls -al

files=(
    "dump.png"
    "me.linux.se.conf"
    "log.txt"
)

success=0
for path in "${files[@]}"; do
    if [[ ! -f $path ]]; then
        printerror "Missing file" "$path"
        success=1
    elif [[ "$path" != "dump.png" ]]; then
        printthisfile "$path"
    fi
done

exit $success


read -p "Done viewing vhost?"
