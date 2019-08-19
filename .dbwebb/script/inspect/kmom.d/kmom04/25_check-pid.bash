#!/usr/bin/env bash

PID=""
CURR_KMOM="kmom04"

echo "Starting server..."
cd "me/$CURR_KMOM/server" && node index.js &
sleep 2
if [ -f "me/$CURR_KMOM/server/pid" ]
then
    PID=$(< "me/$CURR_KMOM/server/pid")
fi

echo "Killing server with pid: $PID"
kill $PID

echo "Server dead :)"
