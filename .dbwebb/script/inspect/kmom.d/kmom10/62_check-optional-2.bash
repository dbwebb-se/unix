#!/usr/bin/env bash

url="http://localhost:1337/room/list?max=3"


echo "Check optional 2"

read -r -p "Test $url? [Y/n] " response

if [ ! "$response" = "n" ]; then
    curl -s "$url"
fi

echo "Do you see 3 items above?"
sleep 2
