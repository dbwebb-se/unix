#!/usr/bin/env bash

function testClientScript {
    echo ""
    echo "#################"
    echo "Testing: $1"
    echo "#################"
    shift
    echo ""
    bash client.bash $@
    echo ""
    sleep 1
}


# Start server
echo "Starting server..."
cd "me/kmom04/server" && node index.js &
sleep 2



# Test client.bash
cd "me/kmom04/server"

testClientScript "Hello" "hello"
testClientScript "html (should be: This is the file index.html)" html
testClientScript "status (should be: uname -a)" status
testClientScript "sum (should be: 9)" sum 2 3 4
testClientScript "filter (should be: [2, 3, 42])" filter 2 3 42 99
testClientScript "404 (should be: 404 Not Found)" 404
testClientScript "all" all



# Kill server
if [ -f "pid" ]
then
    PID=$(< "pid")
fi

kill $PID
sleep 1
echo "Server dead :)"
