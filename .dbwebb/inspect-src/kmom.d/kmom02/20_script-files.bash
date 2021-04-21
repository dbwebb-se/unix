#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom02/script || exit 1

function printerror
{
    printf "${red} $1 '%s'\n ${normal}" "$2"
}

echo "[$ACRONYM] Check script folder."

files=(
    "hello.bash"
    "argument.bash"
    "if_1.bash"
    "if_2.bash"
    "argument_2.bash"
    "forloop.bash"
    "my_function.bash"
)

success=0
for path in "${files[@]}"; do
    if [[ ! -f $path ]]; then
        printerror "Missing file" "$path"
        success=1
    fi
done

read -p "Press any key to view content of folder script/. "

ls -al

exit $success
