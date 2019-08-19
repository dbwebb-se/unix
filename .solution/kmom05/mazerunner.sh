#!/bin/bash

SERVER="localhost:1337"

function init() {
	curl -s "$SERVER?type=csv" > "gamestatus.txt"
	cat "gamestatus.txt" | tail -1 | cut -d ',' -f2 > "gameid.txt"
	cat "gamestatus.txt"
}

function maps() {
	curl -s "$SERVER/map?type=csv" > "maps.txt"
	map1=$(cat "maps.txt" | tail -1 | cut -d ',' -f1)
	map2=$(cat "maps.txt" | tail -1 | cut -d ',' -f2)
	echo "1. $map1"
	echo "2. $map2"
	echo ""
	echo "use 'mazerunner select # to choose map'"
	echo ""
}

function selectMap() {
	id=$(cat "gameid.txt")
	map=$(cat "maps.txt" | tail -1 | cut -d ',' -f"$1")
	curl -s "$SERVER/$id/map/$map" > /dev/null 
	echo "You selected: $map"
}

function getAvailableRooms() {
	for val in 3 4 5 6;
	do
		temp=$(cat "info.txt" | tail -1 | cut -d ',' -f"$val")
		if [ "$temp" = "-" ];then
			continue
		else
			holder=$(cat "info.txt" | tail -2 | cut -d ',' -f"$val")
			rooms="$rooms $holder"
		fi
	done
	echo $rooms
}

function enter() {
	id=$(cat "gameid.txt")
	if [ -z "$1" ];then
		curl -s "$SERVER/$id/maze?type=csv" > "info.txt"
	fi
	roomid=$(cat "info.txt" | tail -1 | cut -d ',' -f1)
	desc=$(cat "info.txt" | tail -1 | cut -d ',' -f2)

	echo "You are in room: $roomid"
	echo "Description: $desc"
	echo "You can go to: $(getAvailableRooms)"
	echo ""
}

function go() {
	id=$(cat "gameid.txt")
	currRoom=$(cat "info.txt" | tail -1 | cut -d ',' -f1)
	curl -s "$SERVER/$id/maze/$currRoom/$1?type=csv" > "info.txt"
	enter $currRoom
	echo ""
}

while (($#))
do
	case "$1" in

		init)
			init
			shift
			exit 0
		;;

		maps)
			maps
			shift
			exit 0
		;;

		select)
			selectMap "$2"
			shift
			exit 0
		;;

		enter)
			enter
			shift
			exit 0
		;;

		go)
			go "$2"
			shift
			exit 0
		;;

		*)
			shift
			;;

	esac
done
