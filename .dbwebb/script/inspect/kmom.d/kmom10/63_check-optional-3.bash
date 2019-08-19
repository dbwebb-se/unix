#!/usr/bin/env bash

cd "me/kmom10/bthappen/" || exit 1

echo "Trying to execute test.bash"

if [[ -f test.bash ]]; then
    echo "File exists."
    ./test.bash
else
    echo "No test.bash"
    exit 1
fi
