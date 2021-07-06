#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

cd me/kmom06/awk || exit 1
cp ../../../example/awk/awk_names.csv .

echo "[$ACRONYM] Check for awkfiles"



success=0
for path in $(seq 1 10); do
    if [[ ! -f "$path.awk" ]]; then
        printerror "Missing file" "$path.awk"
        success=1
    fi
done

if [[ "$success" -eq 1 ]]; then
    ls -al
fi

exit $success
