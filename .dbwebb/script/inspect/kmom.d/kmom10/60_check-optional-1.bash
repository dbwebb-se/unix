#!/usr/bin/env bash

url="http://localhost:1337/room/searchp/gan"


echo "Check optional 1"


read -r -p "Test $url? [Y/n] " response

if [ ! "$response" = "n" ]; then
    curl -s -f "$url"
fi
