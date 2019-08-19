#!/usr/bin/env bash

cd "me/kmom10/bthappen/server" || exit 1

echo "Trying to start server..."

node index.js &
