#!/usr/bin/env bash

base="http://localhost:1337"
roomlist="$base/room/list"
viewid="$base/room/view/id/2-129"
house="$base/room/view/house/H-huset"
search="$base/room/search/Grupprum"
searchpart="$base/room/search/pprum"

alltests=($base $roomlist $viewid $house $search $searchpart)

echo "Check localhost"

for url in "${alltests[@]}"; do
    read -r -p "Test $url? [Y/n] " response

    if [ ! "$response" = "n" ]; then
        curl -s "$url"
    fi
done
