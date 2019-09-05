#!/usr/bin/env bash
cd me/kmom02/script || exit 1

script="forloop.bash"

echo ""
tput setaf 6
echo "----- Testing script $script -----"
tput sgr0

./"$script" || exit 1

tput setaf 6
read -r -p "----- cat $script? [y/N] ----- " response
tput sgr0

if [ "$response" = "y" ]
then
    cat "$script"

    echo ""
    tput setaf 6
    read -p "----- Done? Press Enter... ----- "
    tput sgr0
fi
