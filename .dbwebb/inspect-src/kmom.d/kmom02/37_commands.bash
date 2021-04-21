#!/usr/bin/env bash
cd me/kmom02/script || exit 1

script="commands.bash"

echo ""
tput setaf 6
echo "----- Testing script $script with argument cal -----"
tput sgr0

./"$script" "cal" || exit 1

echo ""
tput setaf 6
echo "----- Testing script $script with argument greet -----"
tput sgr0

./"$script" "greet" || exit 1

echo ""
tput setaf 6
echo "----- Testing script $script with argument a -----"
tput sgr0

./"$script a" || exit 1

echo ""
tput setaf 6
echo "----- Testing script $script with arguments a test -----"
tput sgr0

./"$script a test" || exit 1

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
