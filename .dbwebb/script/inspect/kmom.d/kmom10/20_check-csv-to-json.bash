#!/usr/bin/env bash

echo "Check csv-to-json script"

cd "me/kmom10/bthappen" || exit 1

rm salar.json || echo "No predefined file"

echo "Running script..."

start=$SECONDS

./salar2json.bash || exit 1

end=$SECONDS
duration=$(( end - start ))
echo ""
echo "Execution time: $duration seconds"
echo ""
read -r -p "View JSON-file? [Y/n] " response

if [ ! "$response" = "n" ]
then
    more *.json
fi
